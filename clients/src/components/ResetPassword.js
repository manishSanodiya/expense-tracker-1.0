import React from 'react'

const ResetPassword = () => {
    const submitHandle = (e)=>{
        e.preventDefault()
    }
  return (
   <>
   <form onSubmit={submitHandle}>
    <label>new password</label>
    <input type='text' />
    <label>confirm new password</label>
    <input type="text" />
    <button type='submit'>Submit</button>
   </form>
   </>
  )
}

export default ResetPassword