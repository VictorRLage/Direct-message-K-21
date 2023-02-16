create database k21;
use k21;

create table usuario (
	idUsuario int primary key auto_increment,
	nome varchar(50),
    usuario varchar(50),
	email varchar(50),
	senha varchar(50)
);

create table amigos(
Usuario1 int ,
Usuario2 int ,
`Status` enum('0','1','2') default '0',
sala int,
primary key (`Usuario1`,`Usuario2`),
foreign key (Usuario1) references usuario(idUsuario),
foreign key (Usuario2) references usuario(idUsuario)
);

select * from usuario;



