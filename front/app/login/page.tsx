const LoginPage = async () => {
  const strapi = process.env.NEXT_PUBLIC_STRAPI_URL;
  return (
    <a href={`${strapi}/api/connect/microsoft`}>
      Sign in with Microsoft
    </a>
  );
};

export default LoginPage;