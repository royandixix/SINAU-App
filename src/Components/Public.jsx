import React from "react";
import { Button, Container, CardTitle, CardText } from "reactstrap";

function Public() {
  return (
    <Container className="mt-5 text-start">
      <CardTitle tag="h1" className="display-4 mb-4">
        Home
      </CardTitle>
      <CardText className="lead mb-3">
        Selamat datang di <strong>SINAU App</strong> — tempat terbaik untuk
        belajar Bahasa Jawa dengan cara yang menyenangkan dan interaktif!
      </CardText>
      <hr className="my-3" />
      <CardText className="mb-4">
        Mulailah perjalanan belajarmu hari ini. Temukan berbagai materi menarik,
        kuis seru, dan fitur lainnya yang akan membantumu memahami Bahasa Jawa
        lebih dalam.
      </CardText>
      <div>
        <Button color="primary">Pelajari Lebih Lanjut</Button>
      </div>
    </Container>
  );
}

export default Public;
