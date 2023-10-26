CREATE TABLE client
(
   id character varying(40) NOT NULL,
   name character varying(100) NOT NULL,
   birthdate date,
   cpf character varying(40) NOT NULL,
   email character varying(256) NOT NULL,
   hashSenha character varying(256) NOT NULL,
   CONSTRAINT client_pkey PRIMARY KEY (id)
);
