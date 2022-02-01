import { Skeleton, Space } from "antd";


const ProductLoader = () => {
  return (
    <Space>
      <Skeleton.Button
        style={{ width: 450, height: 350 }}
        active={true}
        size={"large"}
        block={false}
      />
      <Skeleton.Button
        style={{ width: 450, height: 350 }}
        active={true}
        size={"large"}
        block={false}
      />
    </Space>
  );
};

export default ProductLoader;
