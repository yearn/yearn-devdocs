# Herramientas para contribuidores

---

Esta guía presenta las herramientas utilizadas por el equipo de comunidad de Yearn y sus colaboradores.

Los contribuidores de Yearn trabajan con herramientas orientadas a promover comentarios, comunicación, transparencia y claridad de código abierto. Si bien no existe un stack de software sofisticado, los contribuyentes deben sentirse cómodos con las herramientas más utilizadas y cómo funcionan dentro de los flujos de trabajo de contribución de Yearn.

## Plataformas para discusiones

### Discord

Varios equipos de Yearn (documentación, desarrollo, etc.) organizan AMA, lluvia de ideas, debates y seguimientos en el canal de Discord de Yearn, una plataforma de código abierto orientada a mejorar la comunicación del equipo. El [Discord de Yearn](https://discord.gg/yearn/) enumera todos los canales y usuarios.

Comienza a participar en debates públicos uniéndote a los canales recomendados a continuación.

- [#general](https://discord.gg/Xvku8TrjyA)
- [#governance](https://discord.gg/sPxb4duuhv)
- [#support](https://discord.gg/QeFdQSPuPX)
- [#dev](https://discord.gg/w89vVxeV9h)
- [#documentation](https://discord.gg/freT6YRNSX)

**Tips pro:**

- Visita [#documentation](https://discord.gg/freT6YRNSX) regularmente.
- Es un excelente canal para la colaboración..
- Coordinate con otros miembros.
- Comparte temprano y comparte a menudo.
- Pide retroalimentación.
- Proporciona actualizaciones de progreso.

### Reuniones

Los contribuidores de Yearn organizan reuniones cuando es necesario en Google Hangouts. Estos no están organizados centralmente y surgen orgánicamente dentro de las discusiones entre contribuidores o equipos. Las invitaciones dependen de las personas que organizan estas discusiones. Se envían invitaciones por Discord o Telegram a los contribuidores, Google Calendar programa automáticamente el evento y envía recordatorios.

- [Jitsi Meet](https://meet.jit.si)
- [Google Meet](https://meet.google.com/_meet)

## Plataformas de escritura

### HackMD

Muchos colaboradores de Yearn Doc preparan su documentación de formato largo en [HackMD](https://hackmd.io/), un editor colaborativo de Markdown. HackMD también realiza un seguimiento de las versiones, permite comentar y permite que varios usuarios trabajen en un documento simultáneamente.

**Nota:** Revisa todos los borradores a través de [Gramáticamente](https://app.grammarly.com/) regularmente, y antes de la entrega final.

- Grammarly detectará la mayoría de los errores ortográficos y gramaticales.
   - Revisa las sugerencias para asegurarte de que tengan sentido.
   - **No aceptes ciegamente las ediciones de Grammarly.**
- HackMD no identifica errores ortográficos y gramaticales.
   - Copie el texto de la vista previa renderizada en Grammarly y corrige cualquier error que marque.
   - Grammarly perderá los errores si se le da texto Markdown sin formato.

**Tip Pro:**
Instala HackMD Google Chrome [extensión](https://chrome.google.com/webstore/detail/hackmd-it/cnephjboabhkldgfpdokefccdofncdjh?hl=en) para facilitar la búsqueda.

### Google Docs

Google Docs es una plataforma de escritura colaborativa, con características como edición de sugerencias y nombres de versiones. Los documentos simplifican la retroalimentación y la revisión y son fáciles de compartir entre los miembros del equipo y los contribuidores.

**Sugerencias:**

- Inicia nuevos proyectos y crea primeros borradores en Google Docs.
- Utiliza el "Modo Sugerencia" y deja "Notas" al revisar un documento.
   - Las sugerencias llaman la atención sobre los cambios propuestos.
   - Las notas dejan espacio para discusiones paralelas.
- Evita incluir enlaces directos en un documento de Google.
   - Usa el formato Markdown para simplificar la conversión más adelante.
     - Incorrecto: `https://bad.link.com`
     - Correcto: `[link](https://link.com)`
- Las versiones se pueden nombrar, renombrar, descargar o volver a visitar en cualquier momento.
   - Las versiones ayudan a otros colaboradores a encontrar y ver rápidamente cualquier cambio.
     - Ejemplo: Nombre a Version
- Make sure to name versions before passing projects off for review.
  - Utiliza nombres descriptivos para las versiones.
    - Los nombres deben contener información específica del contenido del archivo o versión. 
- Incluye un número de versión en el nombre, junto con cualquier otro detalle relevante.
  - Los números después del decimal definen las iteraciones preliminares.
    - Ejemplo: V0.1, V0.2, V1.2, etc.

### Markdown

Los documentos de Yearn alojados en GitHub están escritos en Markdown, una sintaxis de formato de texto sin formato. Markdown permite una fácil conversión a HTML y otras salidas, lo que hace que los documentos sean fáciles de leer en la web.

- Aprende los conceptos básicos de Markdown:
  - [Daring Fireball](https://daringfireball.net/projects/markdown/)
  - [Guía de Sintaxis de Markdown](https://guides.github.com/features/mastering-markdown/)
  - [Practica comunicarte usando Markdown](https://lab.github.com/githubtraining/communicating-using-markdown)

Los archivos de markdown se compilan con [Docusaurus](https://docusaurus.io) para brindarte la interfaz de usuario de documentación con estilo que ves aquí.

### VSCode

Si usas Google Docs para escribir, considera usar Visual Studio Code e instala las siguientes extensiones para facilitar el formateo:

- Markdown Preview Enhanced
- Markdown Linter
- Code Spell Checker
- GitLens
- Prettier
  - Prettier corregirá automáticamente la mayoría de los errores de Markdown.
- El [vscode-markdownlint](https://github.com/DavidAnson/vscode-markdownlint#configure) repo de GitHub describe cómo editar el archivo JSON de configuración de errores.
  - Úsalo para abordar cualquier error de Markdown que siga la Guía de estilo de escritura.
- Cómo integrar GitHub con VSCode:
  - **Video:** [Cae corriendo con Visual Studio Code y GitHub](https://youtu.be/ghL-KlAhBnc)

## Herramientas y Tips

### Específico de escritura

#### Mejores prácticas

- Incluye saltos de línea encima y debajo de los títulos.
- Usa encabezados de nivel superior `#` solo una vez por documento.
   - No hagas varios encabezados de nivel superior.
- Evita títulos repetidos.
   - Romperán la navegación generada automáticamente.
- Evita los espacios finales.
- No utilizar:
  - Em o en [Guiones](https://en.wikipedia.org/wiki/Wikipedia:Hyphens_and_dashes): `—`.
  - Símbolos de unión `&` en títulos y encabezados.
  - Tubos `|` en títulos y encabezados.
  - comillas rizadas. Usar la versión de texto sin formato.
    - **Correcto:** `"`
    - **Incorrecto:** `“`
  - Escapa de los paréntesis. Utiliza paréntesis normales.
    - **Correcto:** `(SOMETHING)`
    - **Incorrecto:** `\(SOMETHING\)`
- Agrega tareas usando casillas de verificación a medida que crecen los proyectos.
  - Un guión y corchetes (`- []`) en una nueva línea aparece como una casilla de verificación en la interfaz de usuario de GitHub.
  - **Ejemplo:**
    - \[ \]
- Asegúrate de que haya un solo retorno duro al final de un archivo .md.
- Usa comentarios en el texto para una mayor visibilidad cuando colabores con otros colaboradores en documentos de HackMD.
  - Haz clic en el icono de comentario en la barra de herramientas y elige un estilo apropiado.
  - Considera incluir una marca de tiempo o nombre de usuario:
    - **Markdown:** `> ¡Mira aquí! [name=John Doe]`
    - **Renderizado:** `¡Mira aquí! \[name=John Doe\]`
  - Asegúrate de eliminar los comentarios antes de enviar solicitudes de extracción.
- Usa un emoji para llamar la atención sobre un punto importante, cuando sea necesario.
  - Practica la discreción y úsalos con moderación..
    - No cargar documentos con emojis.
  - Esta [guía de trucos](https://gist.github.com/rxaviers/7360908) enlista emojis y sus atajos de Markdown.

#### Nombrar archivos y versiones

- Los nombres de los archivos Markdown deben estar en minúsculas.
- Usa guiones `-`, no espacios, para separar palabras dentro de los nombres de archivos de Markdown.
  - **Correcto:** `meeting-transcript-ep-01.md`
  - **Incorrecto:** `Meeting Transcript Episode 01.md`
- Usa nombres descriptivos para archivos y versiones de Markdown.
  - Los nombres de archivo deben contener información específica del contenido del archivo..
    - El contexto se proporciona desde el directorio o a través de la capa de presentación (por ejemplo, Docusaurus).
  - **Correcto:** `meeting-summary-ep-01.md`
  - **Incorrecto:** `scientific-governance-and-risk-meeting-summary-ep-01.md`

**Tip Pro:**
Para el borrador final de un documento, asígnale el nombre "Borrador final, moviéndose a GitHub". Publica un enlace al archivo HackMD o una página relevante en GitHub.

### Miscelaneos

#### Enlaces importantes

- [GitHub Desktop](https://desktop.github.com/)
- [Revisar enlaces rotos](https://ahrefs.com/broken-link-checker)
- [Bloques de código](https://gsuite.google.com/marketplace/app/code_blocks/100740430168?pann=cwsdp&hl=en): para formatear bloques de código en un documento o agregar Markdown.
- [Conversión a Markdown](https://github.com/lmmx/gdocs2md-html): para Google Drive.
  - Un largo [hilo de intercambio de stack](https://webapps.stackexchange.com/questions/44047/how-can-google-docs-and-markdown-play-nice) en este caso de uso.
- [DrawIO](https://draw.io/): Software de código abierto que usa Google Drive para crear diagramas de flujo y esquemas.
- [Figma](https://www.figma.com/): Crea maquetas visuales, especialmente para la colaboración en equipo.

#### Carteras y servicios de terceros

- [Metamask](https://metamask.io/): Monedero para enviar y recibir YFI.
- [Zerion](https://zerion.io/): Para comprobar las estadísticas del Tesoro de Yearn.

#### Atajos de teclado

- [Atajos de Mac](https://www.mediaatelier.com/CheatSheet/?ref=producthunt)
- [Atajos de Windows](https://cheatkeys.com/)
- [Use The Keyboard](https://usethekeyboard.com/): Colección de código abierto de métodos abreviados de teclado para aplicaciones de Mac, programas de Windows y sitios web.

### Reconocimientos

Este documento no podría ser posible sin el increíble trabajo realizado por el equipo de MakerDAO, ya que este documento se basa principalmente en su [Guía de herramientas para colaboradores](https://github.com/makerdao/community-portal/blob/r2d/content/en/contribute/content/contributor-tools.mdx).
