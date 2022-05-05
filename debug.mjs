import { RootStore } from './src/client/stores/RootStore.ts'

const rootStore = new RootStore()
rootStore.initialize('abcdef')

let allSavedAnswers = rootStore._stretchAnswerStore.getAllSaved('1234')
console.log(allSavedAnswers)
