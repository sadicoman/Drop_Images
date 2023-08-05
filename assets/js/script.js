// Définir un tableau d'URL d'images
const imageUrls = [
	"assets/images/regard-abeille.jpg",
	"assets/images/DSC00049.jpg",
	"assets/images/DSC00051.jpg",
	"assets/images/DSC00052.jpg",
	"assets/images/DSC00084.jpg",
	"assets/images/DSC00085.jpg",
];

const config = {
	type: Phaser.AUTO,
	width: "100%",
	height: "100%",
	parent: "game",
	scene: {
		preload: preload,
		create: create,
		update: update,
	},
	physics: {
		default: "matter",
		matter: {
			gravity: { y: 0.5 },
			debug: true, // Afficher les limites de collision pour le débogage
		},
	},
};

const game = new Phaser.Game(config);

window.addEventListener("resize", () => {
	let parent = game.canvas.parentElement;
	game.scale.resize(parent.clientWidth, parent.clientHeight);
});

function preload() {
	for (let i = 0; i < imageUrls.length; i++) {
		this.load.image("image" + i, imageUrls[i]);
	}
}

function create() {
	// Créer une plateforme invisible qui couvre toute la largeur du canvas
	this.ground = this.matter.add.rectangle(
		game.scale.width / 2,
		game.scale.height,
		game.scale.width,
		10,
		{ isStatic: true },
	);

	// Désactiver l'affichage des zones de collision
	this.matter.world.createDebugGraphic().setVisible(false);

	// Ajouter un écouteur d'événement au bouton HTML
	document.getElementById("drop").addEventListener("click", () => {
		dropImage(this);
	});
}

function update() {
	// Pas besoin de vérifier les collisions dans la fonction update avec Phaser Matter Physics
}

function dropImage(scene) {
	// Choisir une image aléatoire à partir des URL d'images
	const imageKey = "image" + Phaser.Math.Between(0, imageUrls.length - 1);

	// Générer une position x aléatoire pour l'image
	const x = Phaser.Math.Between(0, game.scale.width - 50);

	// Créer un nouvel objet d'image et l'ajouter à la scène
	const image = scene.matter.add.image(x, 0, imageKey);
	image.setRectangle(); // Utiliser une forme rectangulaire pour la collision
	image.setFrictionAir(0.01); // Ajouter une petite quantité de friction à l'air pour ralentir la rotation
	image.setScale(0.25); // Ajuster la taille de l'image
}
