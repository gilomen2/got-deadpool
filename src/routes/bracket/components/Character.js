import React from 'react'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

export const Character = ({ name, handleChange, value, editable }) => {
  return (
    <FormControl required>
      <InputLabel htmlFor={`${name}`}>{name}</InputLabel>
      <Select
        native
        value={value}
        onChange={handleChange(`${name}`)}
        name={`${name}`}
        inputProps={{
          id: `${name}`
        }}
        disabled={!editable}
      >
        <option value='' />
        <option value={1}>Episode 1</option>
        <option value={2}>Episode 2</option>
        <option value={3}>Episode 3</option>
        <option value={4}>Episode 4</option>
        <option value={5}>Episode 5</option>
        <option value={6}>Episode 6</option>
        <option value={0}>Survivor</option>
      </Select>
    </FormControl>
  )
}
