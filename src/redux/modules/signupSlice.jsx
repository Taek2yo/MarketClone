// Actions
// const LOAD = "lists/LOAD";
const CREATE = "lists/CREATE";

const initialState = {
  post: 
    {
      username: "",
      password: "",
      passwordConfirm: "",
      nickname: "",
    },
  
};

// Action Creators
// export function loadPost(lists) {
//   return { type: LOAD, lists}
// }
export function createList(lists) {
  return { type: CREATE, lists };
}

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    // case "lists/LOAD": {
    //     console.log(state);
    //     console.log(action);
    //   return state ;
    // }
    // case "lists/CREATE": {
    //   const new_list = [...state.post, action.lists]; //장바구니 !!!!!!!장바구니 이거!!!!
    //   console.log(new_list);
    //   return new_list;
    // }
    case "lists/CREATE": {
      const new_list = action.lists;
      console.log(state);
      return new_list;
    }

    default:
      return state;
  }
}