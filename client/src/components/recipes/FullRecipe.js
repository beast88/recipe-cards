import React, { useState } from 'react'
import ConfirmDelete from './ConfirmDelete'
import Button from '../global/Button'

const FullRecipe = (props) => {
  const {recipe, ingredients, method, img, _id} = props.details
  const [confirmDelete, setConfirmDelete] = useState(false)

  const getStyle = () => {
    let background

    if (img === "" || img === undefined) {
      background = {background: 'linear-gradient(0deg, rgba(50,50,50,1) 0%, rgba(15,57,37,1) 30%, rgba(25,135,84,1) 100%)'}
    } else {
      background = {
        background: `linear-gradient(180deg, rgba(196, 196, 196, 0) 0%, rgba(0, 0, 0, 0) 65%, rgba(0, 0, 0, .85) 100%), url(/recipe/images/${img}) no-repeat`,
        backgroundSize: "cover",
        backgroundPosition: "50%"
      }
    }

    return background
  }

  const getList = () => {
    let list

    if(ingredients !== undefined) {
      list = ingredients.map(ingredient => {
        return <li key={ingredient}>{ingredient}</li>
      })
    }

    return list
  }

  const handleClose = () => {
    setConfirmDelete(false)
    props.closeCard()
  }

  return (
    <>      
      <div className="fullcard rounded shadow-lg mt-3 position-absolute">
        <div className="recipe-image rounded-top position-relative" style={getStyle()}>
          <div className="card-buttons d-flex justify-content-between">
            <Button 
              handleClick={() => setConfirmDelete(true)}
              buttonType={'icon-dark'}
              text={<i className="far fa-trash-alt"></i>}
              disable={false}
            />

            <Button 
              handleClick={props.handleEdit}
              buttonType={'icon-dark'}
              text={<i className="far fa-edit"></i>}
              disable={false}
            />

            <Button 
              handleClick={handleClose}
              buttonType={'icon-dark'}
              text={<i className="fas fa-times"></i>}
              disable={false}
            />
          </div>
        </div>

        <div className="p-4">
          <h4>{recipe}</h4>
          <hr></hr>
          <ul>
            {getList()}
          </ul>
          <hr></hr>
          {method}

        </div>        
      </div>

      {confirmDelete && <ConfirmDelete 
        handleCancel={() => {setConfirmDelete(false)}}
        id={_id}
        handleDelete={props.handleDelete}
      />}
    </>
  )
}

export default FullRecipe
