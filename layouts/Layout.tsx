import Header from "../wrappers/header/Header";
import Footer from "../wrappers/footer/Footer";

type Iprops = { 
  children: any;
  headerContainerClass?: any;
  headerTop?: any;
  headerPaddingClass?: any;
}

const Layout = ({
  children,
  headerContainerClass,
  headerTop,
  headerPaddingClass
}: Iprops) => {
  return (
    <>
      <Header
        layout={headerContainerClass}
        top={headerTop}
        headerPaddingClass={headerPaddingClass}
      />
      {children}
      <Footer
        backgroundColorClass="bg-gray"
        spaceTopClass="pt-100"
        spaceBottomClass="pb-50"
      />
    </>
  );
};


export default Layout;
