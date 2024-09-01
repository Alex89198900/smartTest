import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { UsersType } from "../../fakeApi/api";
interface TypeSearch {
  keySearch: string;
  value: string;
}


export const fetchUsers = createAsyncThunk("users/fetch", async () => {
  const response= await fetch('https://jsonplaceholder.typicode.com/users')
  const data = await response.json()
  return data;
});


const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [] as UsersType[],
    filteredUsers: {
      keySearch: '',
       value: '',
    },
    isLoading: true,
    
  },
  reducers: {
    sortedUsers(state, action: PayloadAction<string>) {
      state.users = state.users.sort((a:UsersType, b: UsersType) => {
        if (
          typeof a[action.payload] === "string" &&
          typeof b[action.payload] === "string"
        )
          return a[action.payload].toString().localeCompare(b[action.payload].toString());
        return 0;
      });
    },
    searchUsers(state, action: PayloadAction<TypeSearch>) {
      state.filteredUsers.keySearch=action.payload.keySearch
      state.filteredUsers.value=action.payload.value
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      if (Array.isArray(action.payload) && state.users.length === 0) {
        state.users.push(...action.payload);
      }
    });
  },
});

export const { sortedUsers, searchUsers } = usersSlice.actions;
export default usersSlice.reducer;
