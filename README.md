# Géminis Price Tag

Este proyecto es una aplicación en React que permite subir un archivo CSV con una lista de precios y muestra la información en una tabla con opciones de búsqueda y selección de filas. Además, tiene una funcionalidad para generar etiquetas de precios basadas en la información cargada.

## Características

- **Carga de archivos CSV**: Permite cargar archivos CSV que contienen una lista de productos con precios.
- **Tabla interactiva**: Muestra los datos del archivo en una tabla que incluye:
  - **Buscador**: Filtra los resultados de la tabla en función de la búsqueda.
  - **Selección de filas**: Permite seleccionar filas específicas para generar etiquetas de precios.
- **Generación de etiquetas de precios**: A partir de los productos seleccionados, se generan etiquetas en un formato específico, listas para imprimir.
- **Páginas**:
  - **Home**: Página principal con el uploader y la tabla.
  - **Reportes**: Página que muestra las etiquetas de precios generadas.

## Tecnologías Utilizadas

- **React**: Librería principal para la creación de la interfaz de usuario.
- **TypeScript**: Lenguaje de programación utilizado para asegurar la calidad del código.
- **Ant Design (Antd)**: Framework de UI para los componentes de la tabla y otros elementos de la interfaz.
- **Tailwind CSS**: Framework de utilidades CSS para el estilizado de los componentes.
- **Vite**: Herramienta de desarrollo para empaquetar y servir el proyecto.
- **dayjs**: Librería para manipulación de fechas.

## Instalación y Uso

### Requisitos

- Node.js (versión 14 o superior)
- npm o yarn

### Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/tu-usuario/geminis-price-tag.git
   cd geminis-price-tag
   ```

2. Instala las dependencias:

   ```bash
   npm install
   # o
   yarn install
   ```

3. Ejecuta la aplicación en modo de desarrollo:

   ```bash
   npm run dev
   # o
   yarn dev
   ```

4. Abre el navegador y navega a `http://localhost:3000`.

### Estructura del Proyecto

- `src/components/Tag/Tag.tsx`: Componente que representa una etiqueta de precio individual.
- `src/pages/Home.tsx`: Página principal donde se encuentra el uploader y la tabla de productos.
- `src/pages/Report.tsx`: Página de reportes donde se muestran las etiquetas de los productos seleccionados.
- `src/types/Anexo.ts`: Interfaces TypeScript para los datos de los productos.
- `src/utils/cleanAnexoOriginalData.ts`: Función para limpiar y transformar los datos del CSV.
- `tailwind.config.js`: Configuración de Tailwind CSS.
- `postcss.config.js`: Configuración de PostCSS para Tailwind.

## Personalización

### Estilo de Etiquetas

Las etiquetas generadas se pueden personalizar ajustando el componente `Tag` en `src/components/Tag/Tag.tsx`. Se pueden modificar el diseño, el formato de la fecha, el tamaño de las etiquetas, entre otros.

### Tabla y Buscador

La tabla y el buscador se construyen utilizando Ant Design. Puedes ajustar la funcionalidad y el diseño modificando el componente que se encuentra en `src/pages/Home.tsx`.

## Notas Adicionales

- **Print Optimization**: El botón de "Volver atrás" se oculta al imprimir utilizando Tailwind CSS con la clase `hidden print:hidden`.
- **Data Transformation**: La función `cleanAnexoOriginalData` limpia y transforma los datos del CSV para adaptarlos a la interfaz `Anexo`, calculando el precio final basado en la fórmula definida.

## Próximos Pasos

- **Mejoras en la Tabla**: Agregar paginación para tablas con muchos elementos.
- **Internacionalización**: Soporte para múltiples idiomas.
- **Exportación de Datos**: Funcionalidad para exportar las etiquetas generadas a un formato PDF.

## Contacto

Si tienes alguna pregunta o sugerencia, no dudes en contactar al creador del proyecto.

---

**Autor**: Cristian Badaracco
**Email**: cmbadaracco@gmail.com
**Licencia**: MIT
