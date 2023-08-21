// side-effect occurs when we use something that 
// is outside the scope of components. Side effects can include
// things like data fetching, DOM manipulation, and interacting
//  with external services or APIs. 

// side effects are things that happen 'on the side',
// not during rendering.

// in react, side effects usually belong insde
// event handlers. even though eent handlers
// are defined inside your component, they
// don't run during rendering. so event 
// handlers don't need to be pure.

// local vars don't persist between renders
// changes to local vars wont trigger renderso


// any function starting with `use` is called a Hook
// Hooks are special functions that are only available
// while React is rendering. They let you 'hook into'
// different React features.

// you can't call hooks inside condiitons, loops, or
// other nested functinos.

// state is fully private to the component declaring it

// a state variable is only necessary to keep informatino
// between re-renders of a component.

// setting state only changes it for the next render.
// a state vars' value never changes within a render

// setNumber(number+5):`number` is 0, so react adds `replace with 5` to its
// queue
// setNumber(n=>n+1):`n=>n+1` is an updater function. react adds that func
// to its queue.
// setNumber(42): reactadds 'replace iwth 42' to its queue
// during the next render, react goes through the state queue
// queued update      n     returns
// 'replace ith 5'    0        5
// n=>n+1             5       5 + 1 = 6
// 'replace with 42'  6        42

// react processes state updates after event handlers have finished
// running. this is called batching.

// const [index,setIndex] = useState(0);
// The current state. During the first render, 
// it will match the initialState you have passed.
// The set function that lets you update the state 
// to a different value and trigger a re-render.

// -----------------------------------------

// react preserves a component's state as far as long as its being rendered
// at its position in the UI tree.

// if you wnt to preserve the state between re-renders, the structure of your
// tree needs to 'match up'

{ isPlayerA ? (<Counter person="taylor" />) : (<Counter person='sarah' />) }
// two counters appear in the ssame position, so react sees them as the same
// counter whose `person` prop has changed.
// but conceptually, in the app they should be two separate counters.

// there are two ways to reset state when switching between them:
// 1. render components in different positions
// 2. give each component an explicit identity with key

// 1.
{
  isPlayerA &&
    <Counter person="Taylor" />
}
{
  !isPlayerA &&
    <Counter person="Sarah" />
}

// keys are not globally unique. they only specify the position within th
// parent.

// state is associated with the tree position. a key lets you specify a 
// named position instead of relying on order.

// when you stop rendering the component,
// react destroys its state.

//-----------------------------------------

// you can move that state logic into a single function
// outside your component, called a 'reducer'
// 1.
// your event handlers currently specify what to do by
// setting state;
function handleAddTask(text) {
  setTasks([
    ...tasks,
    {
      id: nextId++,
      text: text,
      done: false,
    },
  ]);
}
// remove all the state setting logic. so you're left with;
// handleAddTask(text) is called when the user presses'add'

// instead of telling react 'what to do' by setting state,
// you specify 'what the user just did' by dispatching
// 'actions' from your event handlers.

// the obj you pass to 'dispatch' is called an 'action'
// it should contain the minimal info about what happend
function handleAddTask(text) {
  dispatchEvent(
    // 'action' obj
    {
      type: 'added', // type that describes what happened
      id: nextId++,
      text: text,
    }
  );
}

// a reducer function is where you will put your state logic
// two args: (the current state) (the action obj)
// it returns the next state
// react will set the state to what you return from the
// reducer
function tasksReducer(tasks, action) {
  switch (action.type) {
    case 'added': {
      return [
        ...tasks,
        {
          id: action.id,
          text: action.text,
          done: false,
        }
      ];
    }
    default: {
      throw Error('unknown action' + action.type);
    }
  }
}

// useReducer hook takes two args:
//    (reducer func) (initialstate)
// it returns: (a stateful value) (a dispatch function)
// stateful: system, process, or obj that retains or
// remembers its current state and past interactions
const [task, dispatch] = useReducer(tasksReducer, initialTasks);

// now the event handlers only specify what happened by
// dispatching actions, and the reducer function determines
// how the state updates inresponse to them

// reducers must be pure.
// similar to state updater functions, reducers run during
// rendering.(actions are queued until next render.) This
// means that reducers must be pure. They should not send
// requests, schedule timeouts, or perform any side effects
// (operations that impact things outside the component)

// each action describes a single user interaction, even if
// that leads to multiple changes in the data

// the dispatched actions are queued until the next render, similar to the updater functions.

//-----------------------------------------
// Passing props is a great way to explicitly pipe data through your UI tree to
// the components that use it.

// create the context
// use the context
// provide the context

// Context lets a parent—even a distant one!—provide some data to the entire tree inside of it.

// useContext tells React that the Heading component wants to read the LevelContext.
// If you don’t provide the context, React will use the default value

// Wrap them with a context provider to provide the LevelContext to them:
// The component will use the value of the nearest <LevelContext.Provider> in the UI tree above it.

// You can pass down any information needed by the entire subtree: 
// the current color theme, the currently logged in user, and so on

// different React contexts don’t override each other.

// use cases for context:
// theming, Current Accoutn, Managing state

//-----------------------------------------

// When you want a component to “remember” some information,
//  but you don’t want that information to trigger new
//  renders, you can use a ref:

// you can use refs to store timeout IDs, DOM elements, 
// and other objects that don’t impact the component’s 
// rendering output.

// This ... is used for rendering, so you’ll keep it in state
// Since ... is not used for rendering, you can keep it in a ref:

// You shouldn’t read (or write) the current value during rendering.	

// refs are mutable. —you can modify and update current’s value outside of the rendering process.

// If you’re familiar with object-oriented programming, refs might remind you of instance fields—but instead of this.something you write somethingRef.current.

// when to use refs:
// -communicate with external APIs
// -storing timeout IDs
// -storing and manipulating DOM elements,
// -storing objs that arent necessary to calculate the JSx

// If your component needs to store some value, but it doesn’t impact the rendering logic, choose refs.

// the ref itself is a regular JavaScript object,

//-----------------------------------------
// You can use any browser APIs, for example:
myRef.current.scrollIntoView();
inputRef.current.focus();
firstCatRef.current.scrollIntoView({
  behavior: 'smooth',
  block: 'nearest',
  inline: 'center'
});

// Pass it as <input ref={inputRef}>. This tells React to put this <input>’s DOM node into inputRef.current.
// In the handleClick function, read the input DOM node from inputRef.current and call focus() on it with inputRef.current.focus().

// Hooks must only be called at the top-level of your component. You can’t call useRef in a loop, in a condition, or inside a map() call.


// if you try to put a ref on your own component, like <MyInput />, by default you will get null
// React prohibits components from accessing DOM nodes of other components, including their own children.

// components that want to expose their DOM nodes have to opt in to that behavior.
// A component can specify that it “forwards” its ref to one of its children
const MyInput = forwardRef((props, ref) => {
  return <input {...props} ref={ref} />;
});

// In design systems, it is a common pattern for low-level components like buttons, inputs, and so on, to forward their refs to their DOM nodes. On the other hand, high-level components like forms, lists, or page sections usually won’t expose their DOM nodes to avoid accidental dependencies on the DOM structure.

// restrict the exposed functionality. 
const MyInput = forwardRef((props, ref) => {
  const realInputRef = useRef(null);
  useImperativeHandle(ref, () => ({
    // Only expose focus and nothing else
    focus() {
      realInputRef.current.focus();
    },
  }));
  return <input {...props} ref={realInputRef} />;
});
// In general, you don’t want to access refs during rendering. That goes for refs holding DOM nodes as well. ref.current will be null.

// React sets ref.current during the commit. Before updating the DOM, React sets the affected ref.current values to null. After updating the DOM, React immediately sets them to the corresponding DOM nodes.

// Usually, you will access refs from event handlers. If you want to do something with a ref, but there is no particular event to do it in, you might need an Effect. 


flushSync(() => {
  setTodos([...todos, newTodo]);
});
listRef.current.lastChild.scrollIntoView();
// This will instruct React to update the DOM synchronously right after the code wrapped in flushSync executes. As a result, the last todo will already be in the DOM by the time you try to scroll to it:

// Refs are an escape hatch. You should only use them when you have to “step outside React”. Common examples of this include managing focus, scroll position, or calling browser APIs that React does not expose.


// Avoid changing DOM nodes managed by React. Modifying, adding children to, or removing children from elements that are managed by React can lead to inconsistent visual results or crashes

// You can safely modify parts of the DOM that React has no reason to update. For example, if some <div> is always empty in the JSX, React won’t have a reason to touch its children list. Therefore, it is safe to manually add or remove elements there.

// Avoid changing DOM nodes managed by React.
// If you do modify DOM nodes managed by React, modify parts that React has no reason to update.

// flushSync call is necessary to force React to update the DOM before the scroll. o
<li ref={index === i ? selectedRef : null}></li>

//-----------------------------------------

// Effects let you run some code after rendering so that you can synchronize your component with some system outside of React.

// Effects let you specify side effects that are caused by rendering itself, rather than by a particular event. 

// useEffect “delays” a piece of code from running until that render is reflected on the screen.

// wrap the side effect with useEffect to move it out of the rendering calculation:

// Effects run after every render. 

// React compares the dependency values using the Object.is comparison.

// the “external system” you synchronized to React state was the browser media API.
useEffect(() => {
  const connection = createConnection();
  connection.connect();
  return () => { // cleanup function
    connection.disconnect();
  };
}, []); // array of dependencies as second argument
// empty dependency array means only run this code when
// the component mounts, i.e. appears on the screen for the
// first time.

// React will call your cleanup function each time component unmounts (gets removed)

// Most of the Effects you’ll write will fit 
// into one of the common patterns below:

// -Controlling non-React widgets:
useEffect(() => {
  const map = mapRef.current;
  map.setZoomLevel(zoomLevel);
}, [zoomLevel]); //to keep the zoom level in sync with a zoomLevel state variable

// -Subscribing to events:
// If your Effect subscribes to something, the cleanup function should unsubscribe:
useEffect(() => {
  function handleScroll(e) {
    console.log(window.scrollX, window.scrollY);
  }
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);

// -Triggering animations:
// If your Effect animates something in, the cleanup function should reset the animation to the initial values:
// If you use a third-party animation library with support for tweening, your cleanup function should reset the timeline to its initial state.
useEffect(() => {
  const node = ref.current;
  node.style.opacity = 1; // Trigger the animation
  return () => {
    node.style.opacity = 0; // Reset to the initial value
  };
}, []);

// -Fetching data:
// If your Effect fetches something, the cleanup function should either abort the fetch or ignore its result:
useEffect(() => {
  let ignore = false;
  async function startFetching() {
    const json = await fetchTodos(userId);
    if (!ignore) {
      setTodos(json);
    }
  }
  startFetching();
  return () => {
    ignore = true;
  };
}, [userId]);
// the second request in development is bothering you, the best approach is to use a solution that deduplicates requests and caches their responses between components:
const todos = useSomeDataLibrary(`/api/user/${userId}/todos`);
// If you use a framework, use its built-in data fetching mechanism. 
// Otherwise, consider using or building a client-side cache. Popular open source solutions include React Query, useSWR, and React Router 6.4+. 

// -Sending analytics 
useEffect(() => {
  logVisit(url); // Sends a POST request
}, [url]);
// For more precise analytics, intersection observers can help track which components are in the viewport and how long they remain visible.

// Not an Effect: Initializing the application 
if (typeof window !== 'undefined') { // Check if we're running in the browser.
  checkAuthToken();
  loadDataFromLocalStorage();
}
// Some logic should only run once when the application starts. You can put it outside your components:
// This guarantees that such logic only runs once after the browser loads the page.

// Not an Effect: Buying a product 
// Buying is not caused by rendering; 
// it’s caused by a specific interaction. 
// It should run only when the user presses the button. 
function handleClick() {
  // ✅ Buying is an event because it is caused by a particular interaction.
  fetch('/api/buy', { method: 'POST' });
}

// Because all dependencies are the same, React ignores the Effect from the second render.
// Each render has its own Effects 0

// Keep in mind that modern frameworks provide more efficient built-in data fetching mechanisms than writing Effects directly in your components.

// When something can be calculated from the existing props or state, don’t put it in state. Instead, calculate it during rendering. 

// You can cache (or “memoize”) an expensive calculation by wrapping it in a useMemo Hook:
// ✅ Does not re-run getFilteredTodos() unless todos or filter change
const visibleTodos = useMemo(() => getFilteredTodos(todos, filter), [todos, filter]);
// This tells React that you don’t want the inner function to re-run unless either todos or filter have changed. 
// The function you wrap in useMemo runs during rendering, so this only works for pure calculations.

console.time('filter array');
const visibleTodos = getFilteredTodos(todos, filter);
console.timeEnd('filter array');
//If the overall logged time adds up to a significant amount (say, 1ms or more), it might make sense to memoize that calculation.

//This is inefficient because ProfilePage and its children will first render with the stale value, and then render again. 

// Avoid: Adjusting state on prop change in an Effect
useEffect(() => {
  setSelection(null);
}, [items]);
// Every time the items change, the List and its child components will render with a stale selection value at first. Then React will update the DOM and run the Effects.
// Better: Adjust the state while rendering
const [prevItems, setPrevItems] = useState(items);
if (items !== prevItems) {
  setPrevItems(items);
  setSelection(null);
}
// When you update a component during rendering, React throws away the returned JSX and immediately retries rendering.

// Always check whether you can reset all state with a key or calculate everything during rendering instead. 
// (props)
<EditForm
  {...props}
  key={props.savedContact.id}
/>

// ask yourself why this code needs to run. Use Effects only for code that should run because the component was displayed to the user.

// Avoid: Event-specific logic inside an Effect
useEffect(() => {
  if (product.isInCart) {
    showNotification(`Added ${product.name} to the shopping cart!`);
  }
}, [product]);

// using a framework’s built-in data fetching mechanism, 

https://react.dev/reference/react/useSyncExternalStore#usage

// 🔴 Avoid: Passing data to the parent in an Effect
useEffect(() => {
  if (data) {
    onFetched(data);
  }
}, [onFetched, data]);
// ✅ Good: Passing data down to the child
return <Child data={data} />;

