import { useState } from "react"
import './App.css'

function App() {
    // Hook "useState"を利用
    // 習慣[someThing, setSomeThing]
    const [title, setTitle] = useState("");

    // data dummy
    const [todos, setTodos] = useState([
        {
          id: 1,
          title: "Todo 1",
          completed: false
        },
        {
          id: 2,
          title: "Todo 2",
          completed: false
        },
        {
          id: 3,
          title: "Todo 3",
          completed: false
        }
    ]);

    const handleAddTodo = () => {
        // 直接変更すると、Reactが「配列が変わった」ことに気づかず、画面が更新されない
        // スプレッド演算子を利用して新しいTodoの配列を作成してその配列でステートを更新
        setTodos([
            ...todos,
            {
                id: todos.length + 1,
                title: title,
                completed: false
            }
        ]);
        setTitle("");
    }

    const handleToggleTodo = (id: number) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? {
                    // 毎回配列を複製して操作する必要がある
                    ...todo,
                    completed: !todo.completed
                }
                : todo
            )
        )
    }

    return (
        <>
            <div>
                <div className="flex gap-2 mb-6">
                    {/*HTMLタグは必ず閉じる "/>" */}
                    <input
                        type="text"
                        name={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="todo title"
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {/*handleAddTodo()としない、Reactに呼び出す関数名を渡し、Reactが実行する*/}
                    <button onClick={handleAddTodo}>Add</button>
                </div>

                {todos.length === 0 ? (
                    <div className="text-center text-gray-500 py-8">
                        <p className="text-lg">タスクがありません</p>
                        <p className="text-sm">新しいタスクを追加してください</p>
                    </div>
                ) : (
                <ul>
                    {/*配列の中にJSX要素があったら、それらを順番に並べて表示する*/}
                    {todos.map((todo) => (
                        <li
                            key={todo.id}
                            className={`flex items-center gap-3 p-3 rounded-lg border transition-all duration-200 ${
                                todo.completed
                                    ? "bg-gray-50 border-gray-200"
                                    : "bg-white border-gray-300 hover:border-blue-300"
                            }`}
                        >
                            <input
                                type="checkbox"
                                checked={todo.completed}
                                onChange={() => handleToggleTodo(todo.id)}
                                className=""
                            />
                            <span
                                className={`flex-1 ${
                                    todo.completed
                                        ? "line-through text-gray-500"
                                        : "text-gray-800"
                                }`}
                            >
                                {todo.title}
                            </span>
                        </li>
                    ))}
                </ul>
                )}

                {todos.length > 0 && (
                    <div className="mt-6 pt-4 border-t border-gray-200">
                        <p>
                            完了済み: {todos.filter((todo) => todo.completed).length} / {todos.length}
                        </p>
                    </div>
                )}

            </div>
        </>
    )
}

export default App
