# Aplicación Gurbia
## Dependencias.
* [React Native](https://facebook.github.io/react-native/releases/0.21/docs/getting-started.html#quick-start).
* [Android SDK](https://facebook.github.io/react-native/releases/0.21/docs/android-setup.html).


## Instalación.
### Instalación para debugging.
Para el proceso de instalación, clonar el repositorio.
```bash
git clone <link>
```

Moverse a la carpeta del proyecto, e instalar los paquetes de NPM necesarios para compilar, usando su manejador de paquetes preferido.
```bash
npm install
```

La aplicación puede correrse tanto en un emulador como en un celular:
* Para correrla en un emulador, inicialmente encender el emulador mediante Android Studio. Posteriormente, compilar e instalar la aplicación con el comando.
  ```
  react-navite run-android
  ```

* Para correrla en un celular, conectar el dispositivo donde se hará debugging del proyecto y comprobar que está disponible para instalar la aplicación con el comando 
  ```
  adb devices
  ```

  Después de verificar que está en línea el dispositivo, ya sea físico o virtual, se corre el comando de compilación y ejecución
  ```
  react-native run-android
  ```

  Con este comando se debe correr la aplicación acorde al código que actualmente se encuentre en el directorio.

### Instalación de versión en deploy.

Para la ejecución de la aplicación en deploy descargar la APK de mediafire.

http://www.mediafire.com/file/z54092sff5a7u73/app-release.apk

En el dispositivo Android se debe otorgar permisos para correr aplicaciones que no han sido descargadas de la playstore, este proceso varía dependiendo de la ROM del móvil.

Finalmente se debe correr el archivo APK desde un explorador de archivos, otorgar los permisos que requiere la aplicación y ejecutarla desde el menú de aplicaciones.
