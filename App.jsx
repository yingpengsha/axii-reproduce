import {
  createElement,
  Fragment,
  createComponent,
  propTypes,
  useViewEffect,
  atom,
} from "axii";
import Item from "./Item";

const fetchList = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([
        { id: "1", name: "1" },
        { id: "2", name: "2" },
        { id: "3", name: "3" },
      ]);
    }, 1000);
  });

App.propTypes = {};

function App() {
  const list = atom([]);
  useViewEffect(() => {
    getList();
  });
  const getList = async () => {
    list.value = await fetchList();
  };

  return (
    <div>
      {() =>
        list.value.map((item) => <Item key={item.id} itemValue={item}></Item>)
      }
    </div>
  );
}

App.Style = (fragments) => {};

export default createElement(createComponent(App));
