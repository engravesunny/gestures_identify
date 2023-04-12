import { defineStore } from 'pinia'
const useSnakeGame = defineStore('snake',{
    state:()=>({
        gameCol:30,
        gameRow:30
    })
})

export default useSnakeGame