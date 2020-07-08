const initialState = null

export const userReducer = (state = initialState, action) => {
  switch(action.type){
    case 'USER':
      return action.payload

    case 'CLEAR':
      return null
    
    case 'UPDATE_USER':
      return{
        ...state,
        followers: action.payload.followers,
        following: action.payload.following
      }
    default:
      return state
  }
}