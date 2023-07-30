export const getBrowserLocation = () => new Promise<{lat: number, lng: number}>(resolve => {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
      pos => {
        const { latitude: lat, longitude: lng } = pos.coords
        resolve({ lat, lng })
      },
    )
  }
})
