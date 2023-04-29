import React,{ useState } from "react"
import { useQuery } from "react-query"
import axios from 'axios'
import { endpoint } from "../../utils"
import {useQueryClient,useMutation} from 'react-query'
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';

import EditTask from './EditTask'
type Props = {}

export default function TasksList({}: Props) {
    const [open, setOpen] = React.useState<boolean>(false);
    const [id,setId]=React.useState<string>('')
    const { data, isLoading,isError } = useQuery(
        "getTasks",
       async ()=>{
        const response= await axios.get(endpoint)
        return response.data
        }
    )
    const queryClient = useQueryClient()
  
  
    const { mutate } = useMutation(
      async (id:string) => await axios.delete(`${endpoint}/${id}`),
      {
        onSuccess: () => {
          queryClient.invalidateQueries("getTasks")
         
        },
      }
    )
    if(isError) return <h1>Error fetching the tasks.</h1>
    if(isLoading) return <h1>Loading...</h1>
    const deleteTask=(id:string)=>(event:any)=>{
        mutate(id)
    }
  return (
    <div style={{display:'flex',gap:20,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
        <h1>Tasks</h1>
        {data?.length>0 && data?.map(({id,title,description,createdAt}:{title:string;description:string;createdAt:string,id:string;})=>{
            return  <Card  key={id} variant="outlined" sx={{ width: 320 }}>
            <Typography level="h2" fontSize="md" sx={{ mb: 0.5 }}>
             {title}
            </Typography>
            <Typography mb={2} level="body2">{createdAt}</Typography>
            
           
            <Box sx={{ display: 'flex' }}>
              <div>
                <Typography level="body3">{description}</Typography>
                
              </div>
              <Button
                variant="solid"
                size="sm"
                color="primary"
                sx={{ ml: 'auto', fontWeight: 600 }}
                onClick={deleteTask(id)}
              >
               Delete
              </Button>
              <Button
                variant="solid"
                size="sm"
                color="primary"
                
                sx={{ ml: 'auto', fontWeight: 600 }}
                onClick={()=>{
                setOpen(true)
                setId(id)
                }}
              >
              Edit
              </Button>
            </Box>
          </Card>
        })}
        <EditTask id={id} open={open} closeModal={()=>setOpen(false)}/>
    </div>
  )
}