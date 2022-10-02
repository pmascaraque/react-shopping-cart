import { createContext, ReactNode, useContext, useState } from "react";

type ShoppingCartContext = {
  getItemQuantity: (id: number) => number,
  increaseCartQuantity: (id: number) => void,
  decreaseCartQuantity: (id: number) => void,
  removeFromCart: (id: number) => void,
}

const ShoppingCartContext = createContext({} as ShoppingCartContext)

export function useShoppingCart() {
  return useContext(ShoppingCartContext)
}

type CartItem = {
  id: number,
  quantity: number
}


type ShoppingCartProviderProps = {
  children: ReactNode
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  function getItemQuantity(id: number) {
    return cartItems.find(item => item.id === id)?.quantity || 0
  }

  function increaseCartQuantity(id: number){
    setCartItems(currItems => {
      if (currItems.find(item => item.id === id) == null) {
        return [...currItems, { id, quantity: 1 }]
      } else {
        return currItems.map(item => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1}
          }
          else {
            return item
          }
        })
      }
    })
  }
  return <ShoppingCartContext.Provider value={{ getItemQuantity, increaseCartQuantity }}>
    {children}
  </ShoppingCartContext.Provider>
}