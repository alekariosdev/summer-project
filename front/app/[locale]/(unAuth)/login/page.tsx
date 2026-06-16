import Image from 'next/image';
import { getTranslations } from 'next-intl/server';

const MicrosoftLogo = () => {
  return (
    <svg
      aria-hidden="true"
      className="size-5 shrink-0"
      viewBox="0 0 21 21"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect fill="#f25022" height="9" width="9" x="1" y="1" />
      <rect fill="#00a4ef" height="9" width="9" x="1" y="11" />
      <rect fill="#7fba00" height="9" width="9" x="11" y="1" />
      <rect fill="#ffb900" height="9" width="9" x="11" y="11" />
    </svg>
  );
}

const LoginPage = async () => {
  const t = await getTranslations('login-page');
  const strapi = process.env.NEXT_PUBLIC_STRAPI_URL;

  return (
    <div className="flex min-h-dvh w-full flex-col">
      <div className="flex justify-center pt-20 pb-20">
        <Image
          alt="The Pulsar"
          className="h-auto w-[222px]"
          height={85}
          priority
          src="/logo.png"
          width={223}
        />
      </div>

      <div className="flex items-center justify-center">
        <div className="w-full max-w-md rounded-2xl bg-white py-16 px-6">
          <div className="mb-4 flex items-stretch gap-3">
            <div className="w-1 shrink-0 rounded-full bg-[#4E2589]" />
            <h1 className="text-2xl font-semibold text-[#4E2589]">
              {t('title')}
            </h1>
          </div>

          <p className="mb-16 text-sm leading-relaxed text-[#313131BF] pr-6">
            {t('description')}
          </p>

          <a
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-[#E5E7EB] bg-white px-4 py-3 text-sm font-medium text-[#171717] transition-colors hover:bg-[#F9FAFB] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0078D4]"
            href={`${strapi}/api/connect/microsoft`}
          >
            <span>{t('buttonPrefix')}</span>
            <MicrosoftLogo />
            <span>{t('buttonSuffix')}</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
