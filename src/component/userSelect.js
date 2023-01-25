import { useState, useEffect, useRef, } from "react";


const UserSelect = ({categories}) => {
    const [selectParent, setSelectParent] = useState(0)
    const [selectedIds, setSelectedIds]   = useState([])
    const [parents, setParents]           = useState([])

    const filter = parents => categories.filter((item) => item.parent === parents)

    const filtered = filter(selectParent)

    const userSelecthandle = (item) => {
        setSelectParent(item.id)
        setSelectedIds([...selectedIds, item.id])
        setParents([...parents, item.parent])
    }
    const userSelecthandleV2 = (item,key) => {
        setSelectParent(item.id)
        setSelectedIds([...selectedIds.slice(0, key), item.id])
        setParents([...parents.slice(0, key), item.parent])
    }

    
    const ref = useRef()

    useEffect(()=>{

        ref.current.scrollLeft += 300

    },[selectedIds])

    return(
        <div className="categories-user-list" ref={ref}>
        {parents.length > 0 && 
            parents.map((item,key)=>{
                const cat = filter(item)
                return(
                <div className="categories-user-list-item">
                    {cat.map((item)=>(
                        <span className={selectedIds.includes(item.id) && 'categories-user-list-item-active'} onClick={()=>userSelecthandleV2(item,key)}>{item.title}</span>
                    ))}
                </div>
                )
            })
        }
        {filtered.length > 0 ? (
        <div className="categories-user-list-item">
            {filtered.map(item=>(
                <span className={selectParent === item.id && 'categories-user-list-item-active'} onClick={()=>userSelecthandle(item)}>{item.title}</span>
            ))}
        </div>
        ) : (
        <div className="categories-user-list-selected">
            <p>Kategori Seçildi</p>
            <button>Devam Et</button>
        </div>
        )
        }
        </div>
    )

}

export default UserSelect