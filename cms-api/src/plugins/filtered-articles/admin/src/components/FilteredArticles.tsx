// src/plugins/filtered-articles/admin/src/components/FilteredArticlesPicker/index.tsx

import { useState, useEffect, useCallback } from 'react'
import type { ChangeEvent } from 'react'
// import { useFetchClient, useNotification }   from '@strapi/strapi/admin'
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

// ─── Types ────────────────────────────────────────────────────────────────────

interface Company {
  id: number
  name: string
}

interface Tag {
  id: number
  name: string
  color?: string
}

interface Article {
  id: number
  title: string
  company?: Company
  tags?: Tag[]
}

type SortOption = 'newest' | 'oldest' | 'featured_first'

interface ArticleFilters {
  featured_only: boolean
  company_id: number | string
  tag_ids: Array<number | string>
  sort_by: SortOption
}

interface PickerValue {
  filters: ArticleFilters
  selected_ids: number[]
}

interface FilteredArticlesPickerProps {
  name: string
  value?: PickerValue | null
  onChange: (event: { target: { name: string; value: PickerValue } }) => void
  label?: string
  hint?: string
  error?: string
}

// ─── Dummy Data ───────────────────────────────────────────────────────────────

const DUMMY_COMPANIES: Company[] = [
  { id: 1, name: 'Metlen' },
  { id: 2, name: 'METKA' },
  { id: 3, name: 'Protergia' },
]

const DUMMY_TAGS: Tag[] = [
  { id: 1, name: 'Announcement', color: '#06B6D4' },
  { id: 2, name: 'Press', color: '#8B5CF6' },
  { id: 3, name: 'Development', color: '#10B981' },
  { id: 4, name: 'Internal', color: '#F59E0B' },
  { id: 5, name: 'Campaign', color: '#EF4444' },
]

const DUMMY_ARTICLES: Article[] = [
  {
    id: 1,
    title: 'A leading global industrial and energy company',
    company: { id: 1, name: 'Metlen' },
    tags: [{ id: 1, name: 'Announcement' }],
  },
  {
    id: 2,
    title: 'METKA expands operations in Southeast Europe',
    company: { id: 2, name: 'METKA' },
    tags: [{ id: 2, name: 'Press' }, { id: 3, name: 'Development' }],
  },
  {
    id: 3,
    title: 'Protergia launches new renewable energy initiative',
    company: { id: 3, name: 'Protergia' },
    tags: [{ id: 1, name: 'Announcement' }, { id: 5, name: 'Campaign' }],
  },
  {
    id: 4,
    title: 'Metlen reports record Q3 trading results',
    company: { id: 1, name: 'Metlen' },
    tags: [{ id: 2, name: 'Press' }],
  },
  {
    id: 5,
    title: 'Annual General Meeting 2026 — key highlights',
    company: { id: 1, name: 'Metlen' },
    tags: [{ id: 4, name: 'Internal' }],
  },
  {
    id: 6,
    title: 'METKA secures major infrastructure contract',
    company: { id: 2, name: 'METKA' },
    tags: [{ id: 1, name: 'Announcement' }, { id: 3, name: 'Development' }],
  },
  {
    id: 7,
    title: 'Energy Transition Summit Southeast Europe recap',
    company: { id: 3, name: 'Protergia' },
    tags: [{ id: 2, name: 'Press' }, { id: 5, name: 'Campaign' }],
  },
  {
    id: 8,
    title: 'Sustainability report 2025 now available',
    company: { id: 1, name: 'Metlen' },
    tags: [{ id: 4, name: 'Internal' }, { id: 3, name: 'Development' }],
  },
]

// ─── Constants ────────────────────────────────────────────────────────────────

const SORT_MAP: Record<SortOption, string> = {
  newest: 'publishedAt:desc',
  oldest: 'publishedAt:asc',
  featured_first: 'featured:desc,publishedAt:desc',
}

const DEFAULT_FILTERS: ArticleFilters = {
  featured_only: false,
  company_id: '',
  tag_ids: [],
  sort_by: 'newest',
}

// ─── Component ────────────────────────────────────────────────────────────────

const FilteredArticlesPicker = ({
  name,
  value,
  onChange,
  label,
  hint,
  error,
}: FilteredArticlesPickerProps) => {

  // const { get }                = useFetchClient()
  // const { toggleNotification } = useNotification()

  // ── Parse stored value ────────────────────────────────────────────────────
  const storedFilters: Partial<ArticleFilters> = value?.filters ?? {}
  const storedSelectedIds: number[] = value?.selected_ids ?? []

  // ── Filter state ──────────────────────────────────────────────────────────
  const [featuredOnly, setFeaturedOnly] = useState<boolean>(
    storedFilters.featured_only ?? DEFAULT_FILTERS.featured_only
  )
  const [selectedCompanyId, setSelectedCompanyId] = useState<number | string>(
    storedFilters.company_id ?? DEFAULT_FILTERS.company_id
  )
  const [selectedTagIds, setSelectedTagIds] = useState<Array<number | string>>(
    storedFilters.tag_ids ?? DEFAULT_FILTERS.tag_ids
  )
  const [sortBy, setSortBy] = useState<SortOption>(
    storedFilters.sort_by ?? DEFAULT_FILTERS.sort_by
  )

  // ── Data state ────────────────────────────────────────────────────────────
  const [companies, setCompanies] = useState<Company[]>([])
  const [tags, setTags] = useState<Tag[]>([])
  const [articles, setArticles] = useState<Article[]>([])
  const [search, setSearch] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const selectedIds: number[] = storedSelectedIds

  // ── Helpers ───────────────────────────────────────────────────────────────

  const currentFilters = (): ArticleFilters => ({
    featured_only: featuredOnly,
    company_id: selectedCompanyId,
    tag_ids: selectedTagIds,
    sort_by: sortBy,
  })

  const persist = (newSelectedIds: number[], newFilters: ArticleFilters): void => {
    onChange({
      target: {
        name,
        value: {
          filters: newFilters,
          selected_ids: newSelectedIds,
        },
      },
    })
  }

  // ── Load companies (dummy) ────────────────────────────────────────────────
  useEffect(() => {
    // TODO: replace with API call
    // const res = await get<StrapiResponse<Company>>(
    //   '/api/companies?pagination[pageSize]=100&sort=name:asc'
    // )
    // setCompanies(res.data?.data ?? [])
    setCompanies(DUMMY_COMPANIES)
  }, [])

  // ── Load tags (dummy) ─────────────────────────────────────────────────────
  useEffect(() => {
    // TODO: replace with API call
    // const res = await get<StrapiResponse<Tag>>(
    //   '/api/tags?pagination[pageSize]=100&sort=name:asc'
    // )
    // setTags(res.data?.data ?? [])
    setTags(DUMMY_TAGS)
  }, [])

  // ── Filter articles from dummy data ───────────────────────────────────────
  const fetchArticles = useCallback((): void => {
    setLoading(true)

    // TODO: replace with API call
    // const params = new URLSearchParams()
    // if (featuredOnly)
    //   params.append('filters[featured][$eq]', 'true')
    // if (selectedCompanyId)
    //   params.append('filters[company][id][$eq]', String(selectedCompanyId))
    // selectedTagIds.forEach((id, i) =>
    //   params.append(`filters[tags][id][$in][${i}]`, String(id))
    // )
    // if (search.trim())
    //   params.append('filters[title][$containsi]', search.trim())
    // params.append('sort',                 SORT_MAP[sortBy])
    // params.append('populate[0]',          'company')
    // params.append('populate[1]',          'tags')
    // params.append('pagination[pageSize]', '100')
    // const res = await get<StrapiResponse<Article>>(`/api/articles?${params.toString()}`)
    // setArticles(res.data?.data ?? [])

    // Simulate filtering on dummy data
    setTimeout(() => {
      let filtered = [...DUMMY_ARTICLES]

      if (selectedCompanyId) {
        filtered = filtered.filter(
          (a) => a.company?.id === Number(selectedCompanyId)
        )
      }

      if (selectedTagIds.length > 0) {
        filtered = filtered.filter((a) =>
          a.tags?.some((t) => selectedTagIds.map(Number).includes(t.id))
        )
      }

      if (search.trim()) {
        filtered = filtered.filter((a) =>
          a.title.toLowerCase().includes(search.toLowerCase())
        )
      }

      setArticles(filtered)
      setLoading(false)
    }, 300) // simulate network delay

  }, [featuredOnly, selectedCompanyId, selectedTagIds, sortBy, search])

  useEffect(() => { fetchArticles() }, [fetchArticles])

  // ── Handlers ──────────────────────────────────────────────────────────────

  const handleFeaturedToggle = (checked: boolean): void => {
    setFeaturedOnly(checked)
    persist(selectedIds, { ...currentFilters(), featured_only: checked })
  }

  const handleCompanyChange = (val: string | number): void => {
    const next = val ?? ''
    setSelectedCompanyId(next)
    persist(selectedIds, { ...currentFilters(), company_id: next })
  }

  const handleTagsChange = (val: Array<number | string>): void => {
    setSelectedTagIds(val)
    persist(selectedIds, { ...currentFilters(), tag_ids: val })
  }

  const handleSortChange = (val: string | number): void => {
    const next = val as SortOption
    setSortBy(next)
    persist(selectedIds, { ...currentFilters(), sort_by: next })
  }

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearch(e.target.value)
  }

  const handleToggleArticle = (id: number): void => {
    const next: number[] = selectedIds.includes(id)
      ? selectedIds.filter((s) => s !== id)
      : [...selectedIds, id]
    persist(next, currentFilters())
  }

  const handleToggle = (article: Article) => {
    console.log('handleToggle', article)
    const isSelected = selectedIds.includes(article.id)

    const next = isSelected
      ? selectedIds.filter((s) => s !== article.id)
      : [...selectedIds, article.id]

    persist(next, currentFilters())
  }

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <Field.Root name={name} error={error} hint={hint}>
      <Field.Label>{label}</Field.Label>

      {/* ── Filter panel ── */}
      <Card marginBottom={4}>
        <CardHeader>
          <Typography variant="sigma" textColor="neutral600">
            FILTERS
          </Typography>
        </CardHeader>
        <CardBody>
          <Flex gap={4}>

            {/* Featured only */}
            <Flex justifyContent="space-between" alignItems="center">
              <Typography>Featured Only</Typography>
              <Switch
                checked={featuredOnly}
                onCheckedChange={handleFeaturedToggle}
                aria-label="Featured Only"
              />
            </Flex>

            {/* Company */}
            <SingleSelect
              label="Company"
              placeholder="All companies"
              value={selectedCompanyId}
              onChange={handleCompanyChange}
              clearLabel="Clear company"
              onClear={() => handleCompanyChange('')}
            >
              {companies.map((c) => (
                <SingleSelectOption key={c.id} value={c.id}>
                  {c.name}
                </SingleSelectOption>
              ))}
            </SingleSelect>

            {/* Tags */}
            <MultiSelect
              label="Tags"
              placeholder="All tags"
              value={selectedTagIds}
              onChange={handleTagsChange}
              onClear={() => handleTagsChange([])}
              clearLabel="Clear tags"
              withTags
            >
              {tags.map((t) => (
                <MultiSelectOption key={t.id} value={t.id}>
                  {t.name}
                </MultiSelectOption>
              ))}
            </MultiSelect>

            {/* Sort */}
            <SingleSelect
              label="Sort by"
              value={sortBy}
              onChange={handleSortChange}
            >
              <SingleSelectOption value="newest">Newest first</SingleSelectOption>
              <SingleSelectOption value="oldest">Oldest first</SingleSelectOption>
              <SingleSelectOption value="featured_first">Featured first</SingleSelectOption>
            </SingleSelect>

          </Flex>
        </CardBody>
      </Card>

      {/* ── Search ── */}
      <Box paddingBottom={3}>
        <Searchbar
          name="article-search"
          value={search}
          onChange={handleSearchChange}
          onClear={() => setSearch('')}
          placeholder="Search articles by title..."
          clearLabel="Clear search"
        >
          Search
        </Searchbar>
      </Box>

      {/* ── Article list ── */}
      <Card>
        <CardHeader>
          <Flex justifyContent="space-between" alignItems="center" width="100%">
            <Typography variant="sigma" textColor="neutral600">
              ARTICLES
            </Typography>
          </Flex>
        </CardHeader>
        <CardBody padding={0} style={{}}>
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
                <Box key={article.id}>
                  <Flex padding={4} gap={3}>
                    <Checkbox
                      checked={selectedIds.includes(article.id)}
                      onChange={() => handleToggle(article)}
                      aria-label={`Select article: ${article.title}`}
                    />
                    <Box flex={1}>
                      <Typography fontWeight="semiBold">
                        {article.title}
                      </Typography>
                      <Flex gap={2} paddingTop={2} wrap="wrap">
                        {article.company && (
                          <Badge active>{article.company.name}</Badge>
                        )}
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

export default FilteredArticlesPicker;