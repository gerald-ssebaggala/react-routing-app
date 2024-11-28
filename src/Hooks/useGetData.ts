import React from 'react'

type Props = {}

export function useGetData () {

    const getUser = (userId: number) => {
      const url = `https://jsonplaceholder.typicode.com/users/${userId}`

      fetch(url).then(res => res.json()).then(data => console.log(data))
      
    }
    
    const getPost = (postId: number) => {
        const url = `https://jsonplaceholder.typicode.com/posts/${postId}`
        
    }


  return ()
}