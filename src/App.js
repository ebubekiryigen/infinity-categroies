import {  useState } from "react";
import UserSelect from "./component/userSelect";


function App() {

  const [catName, setCatName]       = useState('')
  const [parent, setParent]         = useState(0)
  const [categories, setCategories] = useState([
    {id:1,title:"ebbubekir",parent:0},{id:2,title:"ahmet",parent:1},{id:3,title:"mehmet",parent:2},{id:4,title:"ediz",parent:3},
  ])
  const [selectCat, setSelectCat]   = useState([])
  const subCategori = categories.filter((item)=> item.parent === parent)


  const submitHandle = (e) => {
    e.preventDefault()
    let randomId = Math.floor(Math.random() * 999999999)
    setCategories([
      ...categories,
      {
        id:categories.length + 1,
        title:catName,
        parent:parent
      }
    ])
    setCatName('')
  }
  const deleteHandle = (id) =>{
      const newArray = categories.filter((item)=> item.id !== id)
      setCategories(newArray)
  }
  const subCategoriHandle = (id) => {
    setSelectCat([
      ...selectCat,
      categories.find((item)=> item.id === id)
    ])
    setParent(id)
    
  }
  const findSubCategori = (parent) =>{
    if(parent === 0) {
      return setSelectCat([])
    }
    const subCat = categories.find((a)=> a.id === parent)
    return [
        subCat.parent !== 0 && findSubCategori(subCat.parent),
        subCat,
    ]
  }
  const selectSubCategori = (item) => {
    setParent(item.parent)
    setSelectCat(findSubCategori(item.parent).flat(Infinity).filter(Boolean))
  }


  return (
    <section className="categories">
        <form onSubmit={submitHandle}>
              <input type="text" placeholder="Kategori Adı" value={catName} onChange={(e)=>setCatName(e.target.value)} />
              <button disabled={!catName} type="submit">Ekle</button>
        </form>
        <div className="categories-sub-list">
          {selectCat.map((item)=>(
              <div className="categories-sub-list-item" key={item.id} onClick={() => selectSubCategori(item)}>
                  {item.title + '  >'}
              </div>
          ))}
        </div>
        <div className="categories-list">
            {subCategori.map((item)=>(
              <div className="categories-list-item" key={item.id}>
                <div>
                  {item.title}
                </div>
                <div className="categories-list-item-order">
                  <span onClick={()=>subCategoriHandle(item.id)}>
                    Alt Kategori
                  </span>
                  <span onClick={()=>deleteHandle(item.id)}>
                    sil
                  </span>
                </div>
              </div>
            ))}
        </div>
            <UserSelect categories={categories}  />
    </section>
  );
}

export default App;
