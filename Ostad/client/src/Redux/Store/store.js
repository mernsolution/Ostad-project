import { configureStore} from '@reduxjs/toolkit'
import ProfileReducer from '../Slice/ProfileSlice'

const store = configureStore({
reducer:{
	profile:ProfileReducer
}

})
export default store