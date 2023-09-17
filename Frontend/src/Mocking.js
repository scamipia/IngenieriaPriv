import { createContext, useState } from "react";

/**Contexto que provee la dificultad elegida si la hay.
 * Ademas provee dos setters:
 * setDatabase: Settea la dificultad dada.
 * resetDatabase: Vuelve la dificultad a null.
 */
const Database = createContext()
export default Database

export const DatabaseProvider = ({ children }) => {
    const [database, setDatabase] = useState(new Map());

    const resetDatabase = () => setDatabase(new Map())

    return (
        <Database.Provider value={{ database, setDatabase, resetDatabase }}>
            {children}
        </Database.Provider>
    )
}