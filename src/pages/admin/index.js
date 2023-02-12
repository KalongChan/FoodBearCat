const dashboard = () => {
  return <div>123</div>;
};
export default dashboard;

export const getStaticProps = () => {
  return {
    redirect: {
      destination: "/admin/menus",
      permanent: false,
    },
  };
};
