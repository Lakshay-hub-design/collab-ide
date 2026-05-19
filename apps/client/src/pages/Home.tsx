import { useAuthStore } from "@/shared/store/authStore"

const Home = () => {
    const user = useAuthStore(
        (state) => state.user
    )
    if(!user){
        return 
    }
  return (
    <div>
      Home Page
      {user.username}
    </div>
  )
}

export default Home
