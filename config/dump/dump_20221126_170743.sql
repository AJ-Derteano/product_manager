-- MySQL dump 10.13  Distrib 8.0.31, for Linux (x86_64)
--
-- Host: localhost    Database: product_manager
-- ------------------------------------------------------
-- Server version	8.0.31-0ubuntu0.20.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `brands`
--

DROP TABLE IF EXISTS `brands`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `brands` (
  `idbrand` int NOT NULL AUTO_INCREMENT,
  `brand` varchar(50) DEFAULT NULL,
  `date_created` datetime NOT NULL,
  `user_created` varchar(45) NOT NULL,
  `date_updated` datetime NOT NULL,
  `user_updated` varchar(45) NOT NULL,
  PRIMARY KEY (`idbrand`),
  UNIQUE KEY `brand` (`brand`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `brands`
--

LOCK TABLES `brands` WRITE;
/*!40000 ALTER TABLE `brands` DISABLE KEYS */;
/*!40000 ALTER TABLE `brands` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `idcategory` int NOT NULL AUTO_INCREMENT,
  `category` varchar(50) NOT NULL,
  `status` char(1) NOT NULL DEFAULT '1',
  `date_created` datetime NOT NULL,
  `user_created` varchar(45) NOT NULL,
  `date_updated` datetime NOT NULL,
  `user_updated` varchar(45) NOT NULL,
  PRIMARY KEY (`idcategory`),
  UNIQUE KEY `category` (`category`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `categories_ins` BEFORE INSERT ON `categories` FOR EACH ROW BEGIN
  IF NEW.date_created IS NULL THEN
    SET NEW.date_created = CURRENT_TIMESTAMP;
		SET NEW.date_updated = CURRENT_TIMESTAMP;
	END IF; 
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `categories_upd` BEFORE UPDATE ON `categories` FOR EACH ROW BEGIN
	set new.date_updated = CURRENT_TIMESTAMP;
end */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `items_warehouse`
--

DROP TABLE IF EXISTS `items_warehouse`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `items_warehouse` (
  `idwarehouse` int NOT NULL,
  `idproduct` int NOT NULL,
  `logistic_variable` smallint NOT NULL,
  `stock` smallint NOT NULL,
  `idunit` int NOT NULL,
  `expiration_date` date DEFAULT NULL,
  `date_created` datetime NOT NULL,
  `user_created` varchar(45) NOT NULL,
  `date_updated` datetime NOT NULL,
  `user_updated` varchar(45) NOT NULL,
  PRIMARY KEY (`idwarehouse`),
  KEY `i_items_warehouse1` (`idproduct` DESC),
  KEY `f_items_warehouse3` (`idunit`),
  KEY `f_items_warehouse2` (`idproduct`),
  CONSTRAINT `f_items_warehouse1` FOREIGN KEY (`idwarehouse`) REFERENCES `warehouse` (`idwarehouse`),
  CONSTRAINT `f_items_warehouse2` FOREIGN KEY (`idproduct`) REFERENCES `products` (`idproduct`),
  CONSTRAINT `f_items_warehouse3` FOREIGN KEY (`idunit`) REFERENCES `units` (`idunit`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `items_warehouse`
--

LOCK TABLES `items_warehouse` WRITE;
/*!40000 ALTER TABLE `items_warehouse` DISABLE KEYS */;
/*!40000 ALTER TABLE `items_warehouse` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `idproduct` int NOT NULL AUTO_INCREMENT,
  `product` varchar(255) NOT NULL,
  `idunit` int NOT NULL,
  `idcategory` int NOT NULL,
  `idbrand` int NOT NULL,
  `filename` mediumtext,
  `origen_web` mediumtext,
  `date_created` datetime NOT NULL,
  `user_created` varchar(45) NOT NULL,
  `date_updated` datetime NOT NULL,
  `user_updated` varchar(45) NOT NULL,
  PRIMARY KEY (`idproduct`),
  KEY `f_products1_idx` (`idunit`),
  KEY `f_products2_idx` (`idcategory`),
  KEY `f_products4_idx` (`idbrand`),
  CONSTRAINT `f_products1` FOREIGN KEY (`idunit`) REFERENCES `units` (`idunit`),
  CONSTRAINT `f_products2` FOREIGN KEY (`idcategory`) REFERENCES `categories` (`idcategory`),
  CONSTRAINT `f_products4` FOREIGN KEY (`idbrand`) REFERENCES `brands` (`idbrand`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `unit_equivalence`
--

DROP TABLE IF EXISTS `unit_equivalence`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `unit_equivalence` (
  `idunit_equivalence` int NOT NULL AUTO_INCREMENT,
  `base_unit` int NOT NULL,
  `des_unit` int NOT NULL,
  `multiple_quantity` smallint NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `start_validity` datetime NOT NULL,
  `end_validity` datetime NOT NULL,
  `status` char(1) NOT NULL DEFAULT 'A',
  PRIMARY KEY (`idunit_equivalence`),
  KEY `f_unit_equivalence1` (`base_unit`),
  KEY `f_unit_equivalence2` (`des_unit`),
  CONSTRAINT `f_unit_equivalence1` FOREIGN KEY (`base_unit`) REFERENCES `units` (`idunit`),
  CONSTRAINT `f_unit_equivalence2` FOREIGN KEY (`des_unit`) REFERENCES `units` (`idunit`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `unit_equivalence`
--

LOCK TABLES `unit_equivalence` WRITE;
/*!40000 ALTER TABLE `unit_equivalence` DISABLE KEYS */;
/*!40000 ALTER TABLE `unit_equivalence` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `units`
--

DROP TABLE IF EXISTS `units`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `units` (
  `idunit` int NOT NULL AUTO_INCREMENT,
  `unit_code` char(6) NOT NULL,
  `description` varchar(50) NOT NULL,
  `date_created` datetime NOT NULL,
  `user_created` varchar(45) NOT NULL,
  `date_updated` datetime NOT NULL,
  `user_updated` varchar(45) NOT NULL,
  PRIMARY KEY (`idunit`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `units`
--

LOCK TABLES `units` WRITE;
/*!40000 ALTER TABLE `units` DISABLE KEYS */;
/*!40000 ALTER TABLE `units` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `warehouse`
--

DROP TABLE IF EXISTS `warehouse`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `warehouse` (
  `idwarehouse` int NOT NULL AUTO_INCREMENT,
  `code` varchar(50) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `date_low` datetime DEFAULT NULL,
  `date_created` datetime NOT NULL,
  `user_created` varchar(45) NOT NULL,
  `date_updated` datetime NOT NULL,
  `user_updated` varchar(45) NOT NULL,
  PRIMARY KEY (`idwarehouse`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `warehouse`
--

LOCK TABLES `warehouse` WRITE;
/*!40000 ALTER TABLE `warehouse` DISABLE KEYS */;
/*!40000 ALTER TABLE `warehouse` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'product_manager'
--

--
-- Dumping routines for database 'product_manager'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-11-26 17:07:46
