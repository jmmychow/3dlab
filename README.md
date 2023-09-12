# 3D-Lab-Booking-App-Frontend
Booking application and asset library for a lab in an educational institution


VR Lab Website Design and Implementation


Design concept

Unlike conventional downward scrolling websites, this website is forward moving showing the 3D interior model of the lab. A 2D website has different sections. This 3D model also has different sections. At the beginning, the visitor is at the entrance where there is a projector screen which shows the introductory message of the lab. The visitor can then move forward to get inside where there is the main facility of the lab called CAVE which can be booked for various teaching and R&D purposes. Clicking its screen can open the booking application which serves the major purpose of this website. Besides the CAVE screens, there is a rack in which user can find the asset library where 3D model, 360 video and photo assets can be browsed. Then user can scroll the mouse wheel further to enter the last part of the lab where there are a number of high-end workstations which can be booked individually. The drawers besides the workstations are used to let user find various documents like workshop materials and other useful information. The admin desk is the last part of the lab or the bottom of the website where user can submit enquiry or leave message to the lab admin. Like most websites, the navigation is guided and linear. Unlike in games or other 3D environments, user is not allowed to freely explore the 3D interior.


Realization

This website makes use of the 3D graphics engine of the browser to realize the concept. The browser supports WebGL as the graphics API. Javascript is used to access this API. ThreeJS and React are adopted as the main graphics framework and Javascript rendering engine respectively. 3D model of the lab is created using Blender.


3D modeling

Firstly there’s no floor plan of the lab to serve as a reference. Photos are taken to try to construct the model using photogrammetry. But the lab interior is so featureless that this purpose cannot be achieved. The last resort is the usual visual inspection with some on-site measurement. It works with an experienced modeller who is good at inspecting shapes and relative distance between features.


Lighting

The strategy is not to create realtime lighting which is expensive in terms of CPU consumption. Hence all the lightings are baked and size of texture must be considered to incorporate the lighting details to be shown on screen. As it is a scrollable website, the navigation path is fixed, user is not allowed to freely explore the lab. So the texture consumption can be optimized according to the actual area it occupies the screen. Modeling is also needed to take this optimization into consideration to separate models appropriately.


Componentization

As React is adopted for UI programming, the modelling of individual selectable entities in the lab must allow componentization. Although an entity may contain a number of small parts or inside a larger entity, it must appear as a single model for proper operation of the UI. So parts must be joined or it must be separated from the host. Its UV mapping and texturing have to adjusted appropriately.


Naming

For identification by the code, the entity names are required to be specific. But due to compatibility reason, when the model is being exported, a default conversion would happen: space is converted into underscore, dot is obmitted. This must be considered during coding or naming of the individual entity models.


Scene export

Before the scene is being exported, all lightings must be baked at a resolution sufficient to show details without visible pixelation. There’s no need to downsize to the textures individually before this export. The scene should be exported from Blender as a single glb file. As some custom data are stored in some entities, the custom data option must be checked upon export.

Webp generation

Each model appears in the asset library requires an image for selection in the catalogue page.

Calendar implementation

As there’s no existing calendar component suitable for our purpose, the calendar is implemented as a custom component.


Project installation and running

npm install --force

npm run dev

http://localhost:5173

Online demo

https://jmmychow.github.io/3dlab/
