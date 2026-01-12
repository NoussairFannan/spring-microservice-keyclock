package org.sdia.produitservice;

import org.sdia.produitservice.entity.Produit;
import org.sdia.produitservice.repository.ProduitRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class ProduitServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(ProduitServiceApplication.class, args);
	}

	// Crée quelques produits au démarrage si la base est vide
	@Bean
	CommandLineRunner initDatabase(ProduitRepository produitRepository) {
		return args -> {
			// Vérifier si la base est déjà remplie
			if (produitRepository.count() == 0) {
				System.out.println("Initialisation de la base de données avec des produits d'exemple...");
				
				// Électronique
				produitRepository.save(new Produit(null, "PC Portable Dell", "Dell Inspiron 15 - Intel Core i5, 8GB RAM, 256GB SSD", 7500.0, 15));
				produitRepository.save(new Produit(null, "Smartphone Samsung", "Samsung Galaxy S23 - 128GB, 8GB RAM, Appareil photo 50MP", 4500.0, 25));
				produitRepository.save(new Produit(null, "Tablette iPad", "Apple iPad Air - 10.9 pouces, 64GB, Wi-Fi", 5500.0, 12));
				produitRepository.save(new Produit(null, "Écran 27 pouces", "LG UltraGear 27\" - 144Hz, QHD, IPS", 3200.0, 8));
				
				// Périphériques
				produitRepository.save(new Produit(null, "Clavier mécanique", "Logitech G Pro X - Rétroéclairage RGB, Switches mécaniques", 800.0, 30));
				produitRepository.save(new Produit(null, "Souris sans fil", "Logitech MX Master 3 - Sans fil, Précision haute", 600.0, 40));
				produitRepository.save(new Produit(null, "Casque audio", "Sony WH-1000XM5 - Réduction de bruit active, Bluetooth", 3500.0, 18));
				produitRepository.save(new Produit(null, "Webcam HD", "Logitech C920 - 1080p, Microphone intégré", 1200.0, 22));
				
				// Accessoires
				produitRepository.save(new Produit(null, "Disque dur externe", "Seagate 2TB - USB 3.0, Portable", 800.0, 35));
				produitRepository.save(new Produit(null, "Chargeur rapide", "Anker PowerPort - 65W, USB-C, Charge rapide", 500.0, 50));
				produitRepository.save(new Produit(null, "Hub USB-C", "Anker 7-en-1 - HDMI, USB 3.0, SD Card Reader", 700.0, 28));
				produitRepository.save(new Produit(null, "Support laptop", "Rain Design mStand - Aluminium, Ergonomique", 900.0, 20));
				
				// Gaming
				produitRepository.save(new Produit(null, "Manette Xbox", "Xbox Wireless Controller - Bluetooth, Compatible PC", 650.0, 32));
				produitRepository.save(new Produit(null, "Clavier gaming", "Corsair K70 RGB - Rétroéclairage RGB, Switches Cherry MX", 1500.0, 15));
				produitRepository.save(new Produit(null, "Souris gaming", "Razer DeathAdder V3 - 30K DPI, Sans fil", 1100.0, 25));
				
				System.out.println("✅ " + produitRepository.count() + " produits d'exemple créés avec succès !");
			} else {
				System.out.println("ℹ️  Base de données contient déjà " + produitRepository.count() + " produit(s).");
			}
		};
	}
}
