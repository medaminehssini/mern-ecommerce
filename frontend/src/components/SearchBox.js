import React , { useState} from 'react'
import { Button, Form, FormControl } from 'react-bootstrap'

const SearchBox = ({history }) => {

    const [keyWord, setKeyWord] = useState("")

    const submitHandler = (e)  => {
        e.preventDefault()
        if(keyWord.trim()){
            history.push(`/search/${keyWord}`)
        }else{
            history.push('/')
        }
    }


    return (
        <Form className="d-flex" onSubmit={submitHandler}>
            <FormControl
                type="search"
                placeholder="Search"
                className="mr-2"
                value={keyWord}
                aria-label="Search"
                onChange= {(e)=>setKeyWord(e.target.value) }
            />
            <Button type="submit" id="search-btn" ><i className="fas fa-search "></i></Button>
        </Form>
    )
}

export default SearchBox
