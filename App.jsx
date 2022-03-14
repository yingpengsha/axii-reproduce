import {
  createElement,
  Fragment,
  createComponent,
  propTypes,
  atom,
} from "axii";

App.propTypes = {};

function App() {
  const toggleValue = atom(false);

  return (
    <>
      <button
        onClick={() => {
          toggleValue.value = !toggleValue.value;
        }}
      >
        toggle
      </button>
      {() => toggleValue.value}
      {() => (
        <div style={toggleValue.value || { transform: "rotate(-90deg)" }}>
          This is axii-reproduce
        </div>
      )}
    </>
  );
}

App.Style = (fragments) => {};

export default createComponent(App);
