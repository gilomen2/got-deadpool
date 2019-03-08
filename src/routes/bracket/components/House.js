import React from 'react'
import { Character } from './Character'

export const House = ({ houseName, house, handleChange, characterBracket, editable }) => {
  return (
    <div className={'house'}>
      <div className={'house-info'}>
        <h3 className={'house-name'}>{houseName}</h3>
      </div>
      <div className={'house-members'}>
        {house.length && house.map(character => {
          return (
            <Character key={`${character.name}`} editable={editable} name={character.name} handleChange={handleChange} value={characterBracket[`${character.name}`] ? characterBracket[`${character.name}`] : ''} />
          )
        })}
      </div>
    </div>
  )
}
