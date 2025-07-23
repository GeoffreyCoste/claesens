export const uvToWorld = (u, v, z, camera, width, height) => {
  const fov = (camera.fov * Math.PI) / 180;
  const camDistance = camera.position.z - z;
  const planeHeight = 2 * Math.tan(fov / 2) * camDistance;
  const aspect = width / height;
  const planeWidth = planeHeight * aspect;

  // Adapter UV pour correspondre à la transformation du shader
  const adjustedU = u / aspect;
  const adjustedV = v;

  const x = (adjustedU - 0.5) * planeWidth;
  const y = (adjustedV - 0.5) * planeHeight;
  return [x, y, z];
};