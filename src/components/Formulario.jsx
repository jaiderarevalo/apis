import { useState } from "react";
import Table from "./Table";

function Formulario() {
  const [datas, setDatas] = useState([]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newData = {
      name: e.target.name.value,
      username: e.target.username.value,
    };
    const response = await fetch("http://localhost:5000/app/rou", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    });
    await response.json();
    setDatas([...datas, newData]);
   
  };
  

  return (
    <>
      {datas.length > 0 ? (
        <h1>formulario enviado</h1>
      ) : (
        <form onSubmit={handleSubmit} className="flex mt-10">
          <div className="m-auto border-2 w-2/6 border-x-violet-500 py-10 border-y-0">
            <h1 className="text-center capitalize text-4xl py-3">
              ingrese sus datos personales
            </h1>
            <div className="px-5">
              <div>
                <div>
                  <label className="">Nombre</label>
                </div>
                <input
                  className="border-2 w-full px-2 rounded-lg"
                  type="text"
                  id="name"
                  placeholder="Ingrese su nombre"
                  onChange={(e) =>
                    setDatas({
                      name: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <div>Apellido</div>
                <input
                  className="border-2 w-full px-2 rounded-lg"
                  type="text"
                  id="username"
                  placeholder="Ingrese su apellido"
                  onChange={(e) =>
                    setDatas({
                      username: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="text-center pt-2">
              <button className="border-2 px-14 py-2 rounded-lg bg-red-500">
                Guardar
              </button>
            </div>
          </div>
        </form>
      )}
      <Table/>
    </>
  );
}

export default Formulario;
