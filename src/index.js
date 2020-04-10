import React from "react"
import { render } from "react-dom"
import generateQuestions from "./engine"
import "./dist/styles.css"

const InputPanel = ({ generateQuestions, setQuestions }) => {
    const [timeTables, setTimeTables] = React.useState([])
    const from = React.useRef(null)
    const to = React.useRef(null)
    const totalValuesPerTimeTable = React.useRef(null)
    const lastValue = React.useRef(null)
    const timeTable = React.useRef(null)

    return <div className="">
        <div className="border-red-300 px-5 py-5 rounded-md">
            <label className="text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">Time table</label>
            <input
                ref={timeTable}
                type="number" className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" />
            <button
                onClick={e => {
                    const i = timeTables.splice(0)
                    i.push(timeTable.current.value)
                    setTimeTables(i)
                    timeTable.current.value = ""
                    timeTable.current.focus()
                }}
                className="my-5 shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">Add number</button>
            <span className="mx-5 text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">Provided range:</span>
            <span className="mx-1"> {JSON.stringify(timeTables)}</span>
        </div>

        <div>
            <label className="text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">Last value to generate</label>
            <input ref={lastValue} type="number" className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" />
        </div>

        <div className="px-5 py-5 border-black">
            <label className="text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">Selection range</label>
            <input ref={from} type="number" className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-1/3 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" />
            <span>...</span>
            <input ref={to} type="number" className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-1/3 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" />
        </div>

        <div>
            <label className="text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">Total values to select per time table</label>
            <input
                ref={totalValuesPerTimeTable}
                type="number" className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" />
        </div>
        <div>
            <div className="">
                <button
                    onClick={_ => {
                        const end = lastValue.current.value
                        const selectionRange = [from.current.value, to.current.value]
                        const select = totalValuesPerTimeTable.current.value


                        const param = {
                            timeTables, end, selectionRange, select
                        }
                        const q = generateQuestions(param)
                        setQuestions(q)
                    }}
                    className="my-5 center shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">Generate Questions</button>
            </div>
        </div>
    </div>
}

const App = () => {
    const [questions, setQuestions] = React.useState([])
    const markup = questions.map((q, i) => <div className="m-4 flex-col border-2 rounded border-gray-600 px-5 py-5" key={i}>{q}</div>)
    return <div className="container mx-auto text-black">
        <h1 className=" text-6xl px-10 underline text-yellow-700 text-center">Generate division questions for year3</h1>
        <InputPanel generateQuestions={generateQuestions} setQuestions={setQuestions} />
        {questions.length === 0 && (<NoQuestionGeneratedBanner/>)}
        {questions.length > 0 && (<div className="flex flex-wrap text-justify ">
            {markup}
        </div>)}
    </div>
}

function NoQuestionGeneratedBanner() {
    return (<div className="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3" role="alert">
        <p className="font-bold">Informational message</p>
        <p className="text-sm">No questions generated!</p>
    </div>)
}

render(<App />, document.getElementById("app"))