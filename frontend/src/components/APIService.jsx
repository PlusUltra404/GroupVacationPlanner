import axios from "axios";


export default class APIService{
     

    create_user(firstname,lastname,email,username,password,mobile,intro,profile){
        return axios.post(`/api/register`,{firstname: firstname,lastname: lastname,email: email,username: username,password: password
        ,mobile: mobile, intro: intro, profile: profile})
    }

    get_user(username){
      return axios.post(`/api/user`, {username: username} )

    }

    update_user(username, email, password,intro, mobile,firstname,lastname) {
      return axios.post(`/api/update`, {username: username, email: email, password: password, intro: intro, mobile: mobile, firstname: firstname, lastname: lastname})

    }

    login(user, password){
        return axios.post(`/api/token`, {username: user, password: password})
    }
    create_chat(username , title, password){
      return axios.post('https://api.chatengine.io/chats/',{ 'title': title,'is_direct_chat': 'False'}, {headers: {'User-Name' : username, 'Project-ID' : 'd84aadd4-ad67-4b0b-b507-415a6fb05ae2' , 'User-Secret' : password}})

    }

    join_chat(username,password,chat_id){
      return axios.post('https://api.chatengine.io/chats/'+chat_id.toString()+'/people/',{'username': username}, {headers: {'User-Name' : username, 'Project-ID' : 'd84aadd4-ad67-4b0b-b507-415a6fb05ae2' , 'User-Secret' : password}})

    }
    




    message(user, password){
      axios.get(`/api/chatscreen`, {username: user, password: password})
    }

    joingroup(username, group){
      return axios.post(`/api/join`, {username: username, group: group })
    }

    creategroup(username , title,  profile, id){
      return axios.post(`/api/get-started`, {username: username, title: title , profile: profile, id: id})
    }
    
    save_event(user , title, date, content, group_id){
      return axios.post(`/api/event`, {user: user, title: title , date: date, content: content, group_id:group_id})
    }

    get_event(user){
      return axios.post(`/api/events`,{user: user})
    }

    get_groups(user){
      return axios.post(`/api/groups`, {user: user})
    }



   /* logout() {
        this.user_token = 0;
        this.config = {
            headers: {
                Authorization: 'Bearer ' + props.token
              }
        }
    }

    */


}


