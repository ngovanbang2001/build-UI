// reducer.js (thằng này có chức năng xử lí và đưa dữ liệu vào trong store)
const init = {
    cars: ['BMW']
}

export default function reducer(state = init, action, args) {
    switch (action) {
        case 'ADD':
            const [newCar] = args
            console.log({
                ...state,
                cars: [...state.cars, newCar]
            })
            return {
                ...state,
                cars: [...state.cars, newCar]
            }
            break
        default:
            return state
    }
}