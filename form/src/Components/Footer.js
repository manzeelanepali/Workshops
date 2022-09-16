const Footer = () => {
  let footerStyle = {
    color: "green",
    fontStyle: "italic",
    fontSize: 16,
  };
  // if (true) {
  //   footerStyle = { ...footerStyle, color: red };
  // }

  return (
    <div style={footerStyle}>
      <br />
      <em>Note app, TEJ Center ,2022</em>
    </div>
  );
};
export default Footer;
