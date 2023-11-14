/**
 * 
 * @returns 
 */
export const parseRequestUrl = () => {
    const url = document.location.hash.toLowerCase()
    const request = url.split('/')
    
    return {
      resource: request[1],
      id: request[2],
      action: request[3],
    }
  }
  
  /**
   * 
   * @param {*} screen 
   */
  export const rerender = async(screen) =>{
    document.getElementById('main-container').innerHTML = await screen.render()
    if(screen.after_render) await screen.after_render()
  }

  /**
   * 
   * @param {*} component 
   * @param {*} tag 
   */
  export const updateView = (component,tag) =>{
    document.querySelector(tag).innerHTML =  component.render()
    if(component.after_render) component.after_render()
  }
  