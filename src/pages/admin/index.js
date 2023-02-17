const dashboard = () => {
  return <div></div>;
};
export default dashboard;

export const getStaticProps = () => {
  return {
    redirect: {
      destination: "/admin/menus",
      permanent: true,
    },
  };
};
