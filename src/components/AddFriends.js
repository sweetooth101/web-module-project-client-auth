
import React, {useState} from 'react';

const initialFormValues = {
    username: '',
    email: '',
    age: 0
}

export default function AddFriend(props){
    const {addFriend} = props
    const [values, setValues] = useState(initialFormValues)

    const onChange = evt => {
        const { id, value } = evt.target
        setValues({ ...values, [id]: value })
      }
    
    const onSubmit = evt => {
        evt.preventDefault()
        addFriend(values)
        setValues(initialFormValues)
      }
    return (
        <div>
            <form id="addForm" onSubmit={onSubmit}>
                <h2>Add New Friend</h2>
                <input id="username" value={values.username} onChange={onChange} placeholder="enter friend username"/>
                <input id="email" value={values.email} onChange={onChange} placeholder="enter friends email"/>
                <input id="age" value={values.age} onChange={onChange} placeholder="enter friends age"/>
                <button >Submit</button>
            </form>
        </div>
    )
}







// * [ ] Use the [mockup provided](./addfriends_mockup.png) to build out a simple component allowing you to collect data to add in a new friend.
// * [ ] The component should include a form with inputs for each friend attribute and a submit button.
// * [ ] When submitting the form, make a call to the approprate api endpoint with your new friend data. Remember that this is a protected route.
// * [ ] In `App.js`, add a route to allow this component to be displayed when navigating to `/friends/add`.