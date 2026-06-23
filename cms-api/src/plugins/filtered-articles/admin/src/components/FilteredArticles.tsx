import { useState, useEffect, useCallback } from 'react'
import type { ChangeEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useFetchClient, useNotification } from '@strapi/strapi/admin'
import {
  Box,
  Flex,
  Typography,
  Searchbar,
  Checkbox,
  Loader,
  Badge,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Field,
  Switch,
  SingleSelect,
  SingleSelectOption,
  MultiSelect,
  MultiSelectOption,
} from '@strapi/design-system'
import { PLUGIN_ID } from '../pluginId'

interface Company {
  id: number
  name: string
}

interface Category {
  id: number
  name: string
}

interface Tag {
  id: number
  name: string
}

interface Article {
  id: number
  documentId: string
  title: string
  companies?: Company[]
  categories?: Category[]
  tags?: Tag[]
}

type SortOption = 'newest' | 'oldest' | 'featured_first'

interface ArticleFilters {
  featured_only: boolean
  company_id: string
  category_ids: string[]
  tag_ids: string[]
  sort_by: SortOption
}

interface PickerValue {
  filters: ArticleFilters
  selected_ids: string[]
}

interface FilteredArticlesPickerProps {
  name: string
  value?: PickerValue | null
  onChange: (event: { target: { name: string; value: PickerValue } }) => void
  label?: string
  hint?: string
  error?: string
}

interface StrapiListResponse<T> {
  data: T[]
}

const SORT_MAP: Record<SortOption, SortOption> = {
  newest: 'newest',
  oldest: 'oldest',
  featured_first: 'featured_first',
}

const DEFAULT_FILTERS: ArticleFilters = {
  featured_only: false,
  company_id: '',
  category_ids: [],
  tag_ids: [],
  sort_by: 'newest',
}

const SEARCH_DEBOUNCE_MS = 300

const FilteredArticlesPicker = ({
  name,
  value,
  onChange,
  label,
  hint,
  error,
}: FilteredArticlesPickerProps) => {
  const { get } = useFetchClient()
  const { toggleNotification } = useNotification()
  const [searchParams] = useSearchParams()
  const locale = searchParams.get('plugins[i18n][locale]')

  const storedFilters: Partial<ArticleFilters> = value?.filters ?? {}
  const storedSelectedIds: string[] = value?.selected_ids ?? []

  const [featuredOnly, setFeaturedOnly] = useState(
    storedFilters.featured_only ?? DEFAULT_FILTERS.featured_only
  )
  const [selectedCompanyId, setSelectedCompanyId] = useState(
    storedFilters.company_id ?? DEFAULT_FILTERS.company_id
  )
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>(
    storedFilters.category_ids ?? DEFAULT_FILTERS.category_ids
  )
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>(
    storedFilters.tag_ids ?? DEFAULT_FILTERS.tag_ids
  )
  const [sortBy, setSortBy] = useState<SortOption>(
    storedFilters.sort_by ?? DEFAULT_FILTERS.sort_by
  )

  const [companies, setCompanies] = useState<Company[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [tags, setTags] = useState<Tag[]>([])
  const [articles, setArticles] = useState<Article[]>([])
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [loading, setLoading] = useState(false)

  const selectedIds = storedSelectedIds

  const localeParams = locale ? { locale } : {}

  const currentFilters = (): ArticleFilters => ({
    featured_only: featuredOnly,
    company_id: selectedCompanyId,
    category_ids: selectedCategoryIds,
    tag_ids: selectedTagIds,
    sort_by: sortBy,
  })

  const persist = (newSelectedIds: string[], newFilters: ArticleFilters) => {
    onChange({
      target: {
        name,
        value: { filters: newFilters, selected_ids: newSelectedIds },
      },
    })
  }

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), SEARCH_DEBOUNCE_MS)
    return () => clearTimeout(timer)
  }, [search])

  useEffect(() => {
    const loadFilters = async () => {
      try {
        const [companiesRes, categoriesRes, tagsRes] = await Promise.all([
          get<StrapiListResponse<Company>>(`/${PLUGIN_ID}/companies`, {
            params: localeParams,
          }),
          get<StrapiListResponse<Category>>(`/${PLUGIN_ID}/categories`, {
            params: localeParams,
          }),
          get<StrapiListResponse<Tag>>(`/${PLUGIN_ID}/tags`, {
            params: localeParams,
          }),
        ])
        setCompanies(companiesRes.data?.data ?? [])
        setCategories(categoriesRes.data?.data ?? [])
        setTags(tagsRes.data?.data ?? [])
      } catch {
        toggleNotification({ type: 'danger', message: 'Failed to load filter options' })
      }
    }
    loadFilters()
  }, [get, locale, toggleNotification])

  const fetchArticles = useCallback(async () => {
    setLoading(true)
    try {
      const res = await get<StrapiListResponse<Article>>(`/${PLUGIN_ID}/articles`, {
        params: {
          ...localeParams,
          featured_only: featuredOnly,
          company_id: selectedCompanyId || undefined,
          category_ids: selectedCategoryIds.length > 0 ? selectedCategoryIds : undefined,
          tag_ids: selectedTagIds.length > 0 ? selectedTagIds : undefined,
          search: debouncedSearch.trim() || undefined,
          sort_by: SORT_MAP[sortBy],
        },
      })
      setArticles(res.data?.data ?? [])
    } catch {
      toggleNotification({ type: 'danger', message: 'Failed to load articles' })
      setArticles([])
    } finally {
      setLoading(false)
    }
  }, [
    get,
    locale,
    featuredOnly,
    selectedCompanyId,
    selectedCategoryIds,
    selectedTagIds,
    sortBy,
    debouncedSearch,
    toggleNotification,
  ])

  useEffect(() => {
    fetchArticles()
  }, [fetchArticles])

  const handleFeaturedToggle = (checked: boolean) => {
    setFeaturedOnly(checked)
    persist(selectedIds, { ...currentFilters(), featured_only: checked })
  }

  const handleCompanyChange = (val: string | number) => {
    const next = val != null ? String(val) : ''
    setSelectedCompanyId(next)
    persist(selectedIds, { ...currentFilters(), company_id: next })
  }

  const handleCategoriesChange = (val: string[]) => {
    setSelectedCategoryIds(val)
    persist(selectedIds, { ...currentFilters(), category_ids: val })
  }

  const handleTagsChange = (val: string[]) => {
    setSelectedTagIds(val)
    persist(selectedIds, { ...currentFilters(), tag_ids: val })
  }

  const handleSortChange = (val: string | number) => {
    const next = String(val) as SortOption
    setSortBy(next)
    persist(selectedIds, { ...currentFilters(), sort_by: next })
  }

  const handleToggle = (article: Article) => {
    const next = selectedIds.includes(article.documentId)
      ? selectedIds.filter((s) => s !== article.documentId)
      : [...selectedIds, article.documentId]
    persist(next, currentFilters())
  }

  return (
    <Field.Root name={name} error={error} hint={hint}>
      <Field.Label>{label}</Field.Label>

      <Card marginBottom={4}>
        <CardHeader>
          <Typography variant="sigma" textColor="neutral600">
            FILTERS
          </Typography>
        </CardHeader>
        <CardBody>
          <Flex gap={4}>
            <Flex justifyContent="space-between" alignItems="center">
              <Typography>Featured Only</Typography>
              <Switch
                checked={featuredOnly}
                onCheckedChange={handleFeaturedToggle}
                aria-label="Featured Only"
              />
            </Flex>

            <Field.Root width="100%">
              <Field.Label>Company</Field.Label>
              <SingleSelect
                aria-label="Company"
                placeholder="All companies"
                value={selectedCompanyId || null}
                onChange={handleCompanyChange}
                clearLabel="Clear company"
                onClear={() => handleCompanyChange('')}
              >
                {companies.map((c) => (
                  <SingleSelectOption key={c.id} value={String(c.id)}>
                    {c.name}
                  </SingleSelectOption>
                ))}
              </SingleSelect>
            </Field.Root>

            <Field.Root width="100%">
              <Field.Label>Categories</Field.Label>
              <MultiSelect
                aria-label="Categories"
                placeholder="All categories"
                value={selectedCategoryIds}
                onChange={handleCategoriesChange}
                onClear={() => handleCategoriesChange([])}
                clearLabel="Clear categories"
                withTags
              >
                {categories.map((c) => (
                  <MultiSelectOption key={c.id} value={String(c.id)}>
                    {c.name}
                  </MultiSelectOption>
                ))}
              </MultiSelect>
            </Field.Root>

            <Field.Root width="100%">
              <Field.Label>Tags</Field.Label>
              <MultiSelect
                aria-label="Tags"
                placeholder="All tags"
                value={selectedTagIds}
                onChange={handleTagsChange}
                onClear={() => handleTagsChange([])}
                clearLabel="Clear tags"
                withTags
              >
                {tags.map((t) => (
                  <MultiSelectOption key={t.id} value={String(t.id)}>
                    {t.name}
                  </MultiSelectOption>
                ))}
              </MultiSelect>
            </Field.Root>

            <Field.Root width="100%">
              <Field.Label>Sort by</Field.Label>
              <SingleSelect
                aria-label="Sort by"
                value={sortBy}
                onChange={handleSortChange}
              >
                <SingleSelectOption value="newest">Newest first</SingleSelectOption>
                <SingleSelectOption value="oldest">Oldest first</SingleSelectOption>
                <SingleSelectOption value="featured_first">Featured first</SingleSelectOption>
              </SingleSelect>
            </Field.Root>
          </Flex>
        </CardBody>
      </Card>

      <Box paddingBottom={3}>
        <Searchbar
          name="article-search"
          value={search}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
          onClear={() => setSearch('')}
          placeholder="Search articles by title..."
          clearLabel="Clear search"
        >
          Search
        </Searchbar>
      </Box>

      <Card>
        <CardHeader>
          <Typography variant="sigma" textColor="neutral600">
            ARTICLES
          </Typography>
        </CardHeader>
        <CardBody padding={0}>
          {loading ? (
            <Flex justifyContent="center" padding={6}>
              <Loader>Loading articles...</Loader>
            </Flex>
          ) : articles.length === 0 ? (
            <Box padding={6}>
              <Typography textColor="neutral400">
                No articles match the current filters
              </Typography>
            </Box>
          ) : (
            <Box style={{ maxHeight: '420px', overflowY: 'auto', width: '100%' }}>
              {articles.map((article, i) => (
                <Box key={article.documentId}>
                  <Flex padding={4} gap={3}>
                    <Checkbox
                      checked={selectedIds.includes(article.documentId)}
                      onCheckedChange={() => handleToggle(article)}
                      aria-label={`Select article: ${article.title}`}
                    />
                    <Box flex={1}>
                      <Typography fontWeight="semiBold">{article.title}</Typography>
                      <Flex gap={2} paddingTop={2} wrap="wrap">
                        {article.companies?.map((c) => (
                          <Badge key={c.id} active>
                            {c.name}
                          </Badge>
                        ))}
                        {article.categories?.map((c) => (
                          <Badge key={c.id}>{c.name}</Badge>
                        ))}
                        {article.tags?.map((t) => (
                          <Badge key={t.id}>{t.name}</Badge>
                        ))}
                      </Flex>
                    </Box>
                  </Flex>
                  {i < articles.length - 1 && <Divider />}
                </Box>
              ))}
            </Box>
          )}
        </CardBody>
      </Card>

      <Field.Error />
      <Field.Hint />
    </Field.Root>
  )
}

export default FilteredArticlesPicker
