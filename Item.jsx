import {
  createElement,
  Fragment,
  createComponent,
  propTypes,
  atom,
  useViewEffect,
} from "axii";

const fetchChildren = (id) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      switch (id) {
        case "1":
          resolve([{ id: "1-1", name: "1-1" }]);
          return;
        case "2":
          resolve([{ id: "2-1", name: "2-1" }]);
          return;
        case "3":
          resolve([{ id: "3-1", name: "3-1" }]);
          return;
      }
    }, 1000);
  });

Item.propTypes = {
  depth: propTypes.number.default(() => atom(0)),
};

function Item({ depth, itemValue }) {
  // ======================== expand ========================
  const expand = atom(false);
  const toggleExpand = () => {
    console.log("toggle");
    expand.value = !expand.value;
  };

  // ======================== children ========================
  const children = atom([]);
  useViewEffect(() => {
    getChildren();
  });
  const getChildren = async () => {
    children.value = await fetchChildren(itemValue.id);
  };

  return (
    <>
      <item-container
        block
        flex-display
        style={{ gap: "10px", marginLeft: 15 * depth.value + "px" }}
      >
        <span onClick={toggleExpand}>{() => (expand.value ? "v" : ">")}</span>
        <item>{itemValue.name}</item>
      </item-container>
      {() =>
        expand.value ? (
          children.value.map((child) => (
            <Item
              key={child.id}
              itemValue={child}
              depth={depth.value + 1}
            ></Item>
          ))
        ) : (
          null
        )
      }
    </>
  );
}

Item.Style = (fragments) => {};

export default createComponent(Item);
