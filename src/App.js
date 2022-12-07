import { AppBar, Box, Card, CardContent, CardMedia, Dialog, DialogContent, DialogTitle, Grid, Toolbar, Typography } from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'
import pokemonLogo from './logo/pokemon-logo.png'
import './App.css'

function App() {
    const [pokemons, setPokemons] = useState([])
    const [abilitiesPoke, setAbilitiesPoke] = useState([])
    const [openModal, setOpenModal] = useState(false)
    const [pokemon, setPokemon] = useState('')
    // const [busca, setBusca] = useState('')
    
    // const filterePokemon = busca.length > 0 ? pokemons.filter(item => item.data.name.includes(busca)) : [];

    const abilityPokemon = (pokemon) => {
                setAbilitiesPoke(pokemon.data.types)
                setOpenModal(true)
    }
    const getPokemons = () => {

        var endpoints = []
        for (let i = 1; i < 100; i++) {
            endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}/`)    
        }
       var response = axios.all(endpoints.map(endpoint => axios.get(endpoint))).then(res => setPokemons(res))
       return response
    }

    useEffect(() => {
        getPokemons()
    }, [])

  return (
    <Grid container spacing={1} className="App">
        <Grid item xs={12}>
            <AppBar position='static' sx={{backgroundColor:'black'}}>
                <Toolbar>
                    <Box display='flex' justifyContent='center' width='100%'>
                    <Box component='img' src={pokemonLogo} height='4em'/>
                    </Box>
                </Toolbar>
            </AppBar>
        </Grid>
        {pokemons.map(pokemon => 
            <Grid item xs={6} lg={2}>
                <Card key={pokemon.data.name}  onClick={() => {abilityPokemon(pokemon); setPokemon(pokemon)}} sx={{ maxWidth: 345 }}>
                <CardMedia
                    component="img"
                    height="200"
                    image={pokemon.data.sprites.front_default}
                    alt={pokemon.data.name}
                />
                {console.log(pokemon)}
                <CardContent>
                    <Typography gutterBottom variant="h6" align='center' component="div">
                    {pokemon.data.name.toUpperCase()}
                    </Typography>
                </CardContent>
                </Card>
            </Grid>
        )}
    <Dialog open={openModal} onClose={() => setOpenModal(false)} fullWidth maxWidth='md'>
    <DialogTitle textAlign={'center'}>{pokemon?.data?.name.toUpperCase()}</DialogTitle>
    <DialogContent>
        <Grid container spacing={1} style={{justifyContent:'center', display:'flex'}}>
            <Grid item xs={12} style={{justifyContent:'center', display:'flex'}}>
                <img src={pokemon?.data?.sprites?.front_default} alt={`Foto de ${pokemon?.data?.name.toUpperCase()}`} width='30%' />
            </Grid>
            <Grid item xs={12}><Typography align='center' variant='h5'>Type</Typography></Grid>
        {abilitiesPoke.map(res => 
        <Grid item xs={6}>
        <Box key={res}  className='boxAbilities'>{res?.type?.name}</Box>
        </Grid>
        )}
        <Grid item xs={12}><Typography align='center' variant='h5'>Status</Typography></Grid>
        <Grid item xs={3}>
            <Box className='statsBox'>{`${pokemon?.data?.stats?.[0]?.stat?.name} : ${pokemon?.data?.stats?.[0]?.base_stat}`}</Box>
        </Grid>
        <Grid item xs={3}>
            <Box className='statsBox'>{`${pokemon?.data?.stats?.[1]?.stat?.name} : ${pokemon?.data?.stats?.[1]?.base_stat}`}</Box>
        </Grid> 
        <Grid item xs={3}>
            <Box className='statsBox'>{`${pokemon?.data?.stats?.[2]?.stat?.name} : ${pokemon?.data?.stats?.[2]?.base_stat}`}</Box>
        </Grid>
        <Grid item xs={3}>
            <Box className='statsBox'>{`${pokemon?.data?.stats?.[3]?.stat?.name} : ${pokemon?.data?.stats?.[3]?.base_stat}`}</Box>
        </Grid>
        <Grid item xs={3}>
            <Box className='statsBox'>{`${pokemon?.data?.stats?.[4]?.stat?.name} : ${pokemon?.data?.stats?.[4]?.base_stat}`}</Box>
        </Grid>
        <Grid item xs={3}>
            <Box className='statsBox'>{`${pokemon?.data?.stats?.[5]?.stat?.name} : ${pokemon?.data?.stats?.[5]?.base_stat}`}</Box>
        </Grid>
        </Grid>
    </DialogContent>
  </Dialog>
    </Grid>
  )
}

export default App