'use client'
import { Autocomplete, TextField } from '@mui/material'
import { Books } from '@prisma/client'
import Link from 'next/link'
import React from 'react'

export default function SearchBooks({books}: {books: Books[]}) {
  return (
    <Autocomplete
    className='bg-[#3B3B47] w-[500px] p-2 rounded-sm'
          id="combo-box-demo"
          options={books}
          sx={{ width: 300 }}
          
          getOptionLabel={(option) => option.title}
          renderOption={(props, option) => {
            return (
              <Link href={`/books/${option.id}`}>
              <li {...props} key={option.id}>
                {option.title}
              </li>
              </Link>
            );
          }}
          renderInput={(params) => (
            <TextField
            color='secondary'
            //   key={params.inputProps.id}
              {...params}
              id="Author"
              variant="standard"
              // label="Multiple values"
              placeholder="Search Books"
            //   InputProps={{style: {color: 'white'}}}
            />
          )}
        />
  )
}
