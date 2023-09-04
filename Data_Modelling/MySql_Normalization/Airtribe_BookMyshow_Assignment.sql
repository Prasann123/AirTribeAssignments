-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: airtribeassignment_bms
-- ------------------------------------------------------
-- Server version	8.0.34

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
-- Table structure for table `bms_languages`
--

DROP TABLE IF EXISTS `bms_languages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bms_languages` (
  `Language_Id` int NOT NULL AUTO_INCREMENT,
  `Language_Name` varchar(255) NOT NULL,
  `Created_Date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `Update_Date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Language_Id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bms_languages`
--

LOCK TABLES `bms_languages` WRITE;
/*!40000 ALTER TABLE `bms_languages` DISABLE KEYS */;
INSERT INTO `bms_languages` VALUES (1,'English','2023-08-31 18:30:00','2023-08-31 18:30:00'),(2,'Hindi','2023-08-31 18:30:00','2023-08-31 18:30:00'),(3,'Tamil','2023-08-31 18:30:00','2023-08-31 18:30:00');
/*!40000 ALTER TABLE `bms_languages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bms_movie_certification`
--

DROP TABLE IF EXISTS `bms_movie_certification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bms_movie_certification` (
  `Certification_Id` int NOT NULL AUTO_INCREMENT,
  `Certification_Name` varchar(255) NOT NULL,
  `Created_Date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `Update_Date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Certification_Id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bms_movie_certification`
--

LOCK TABLES `bms_movie_certification` WRITE;
/*!40000 ALTER TABLE `bms_movie_certification` DISABLE KEYS */;
INSERT INTO `bms_movie_certification` VALUES (1,'U','2023-08-31 18:30:00','2023-08-31 18:30:00'),(2,'U/A','2023-08-31 18:30:00','2023-08-31 18:30:00'),(3,'A','2023-08-31 18:30:00','2023-08-31 18:30:00');
/*!40000 ALTER TABLE `bms_movie_certification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bms_movie_genres`
--

DROP TABLE IF EXISTS `bms_movie_genres`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bms_movie_genres` (
  `Genre_Id` int NOT NULL AUTO_INCREMENT,
  `Genre_Name` varchar(255) NOT NULL,
  `Created_Date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `Update_Date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Genre_Id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bms_movie_genres`
--

LOCK TABLES `bms_movie_genres` WRITE;
/*!40000 ALTER TABLE `bms_movie_genres` DISABLE KEYS */;
INSERT INTO `bms_movie_genres` VALUES (1,'Action','2023-09-03 18:30:00','2023-09-03 18:30:00'),(2,'Comedy','2023-09-03 18:30:00','2023-09-03 18:30:00'),(3,'Drama','2023-09-03 18:30:00','2023-09-03 18:30:00'),(4,'Adventure','2023-09-03 18:30:00','2023-09-03 18:30:00');
/*!40000 ALTER TABLE `bms_movie_genres` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bms_movies`
--

DROP TABLE IF EXISTS `bms_movies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bms_movies` (
  `Movie_Id` int NOT NULL AUTO_INCREMENT,
  `Movie_name` varchar(255) NOT NULL,
  `Type_Id` int DEFAULT NULL,
  `Language_Id` int DEFAULT NULL,
  `Certification_Id` int DEFAULT NULL,
  `Created_Date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `Update_Date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `Genre_Id` int DEFAULT NULL,
  PRIMARY KEY (`Movie_Id`),
  KEY `Type_Id` (`Type_Id`),
  KEY `Language_Id` (`Language_Id`),
  KEY `Certification_Id` (`Certification_Id`),
  KEY `Genre_Id` (`Genre_Id`),
  CONSTRAINT `bms_movies_ibfk_1` FOREIGN KEY (`Type_Id`) REFERENCES `bms_movies_type` (`Type_Id`),
  CONSTRAINT `bms_movies_ibfk_2` FOREIGN KEY (`Language_Id`) REFERENCES `bms_languages` (`Language_Id`),
  CONSTRAINT `bms_movies_ibfk_3` FOREIGN KEY (`Certification_Id`) REFERENCES `bms_movie_certification` (`Certification_Id`),
  CONSTRAINT `bms_movies_ibfk_4` FOREIGN KEY (`Genre_Id`) REFERENCES `bms_movie_genres` (`Genre_Id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bms_movies`
--

LOCK TABLES `bms_movies` WRITE;
/*!40000 ALTER TABLE `bms_movies` DISABLE KEYS */;
INSERT INTO `bms_movies` VALUES (1,'MovieA',1,1,1,'2023-08-31 18:30:00','2023-08-31 18:30:00',1),(2,'MovieB',2,2,2,'2023-09-01 18:30:00','2023-09-01 18:30:00',2),(3,'MovieC',3,1,3,'2023-09-02 18:30:00','2023-09-02 18:30:00',1),(4,'MovieD',1,3,2,'2023-09-03 18:30:00','2023-09-03 18:30:00',3),(5,'MovieE',2,2,1,'2023-09-04 18:30:00','2023-09-04 18:30:00',4),(6,'MovieF',3,1,3,'2023-09-05 18:30:00','2023-09-05 18:30:00',4),(7,'MovieG',1,2,2,'2023-09-06 18:30:00','2023-09-06 18:30:00',3),(8,'MovieH',2,3,1,'2023-09-07 18:30:00','2023-09-07 18:30:00',1),(9,'MovieI',3,1,3,'2023-09-08 18:30:00','2023-09-08 18:30:00',2),(10,'MovieJ',1,2,2,'2023-09-09 18:30:00','2023-09-09 18:30:00',1);
/*!40000 ALTER TABLE `bms_movies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bms_movies_showtime`
--

DROP TABLE IF EXISTS `bms_movies_showtime`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bms_movies_showtime` (
  `Showtime_Id` int NOT NULL AUTO_INCREMENT,
  `Movie_Id` int NOT NULL,
  `Theatre_Id` int NOT NULL,
  `Show_Time` time NOT NULL,
  `Show_Date` date NOT NULL,
  `Price` decimal(8,2) NOT NULL,
  `Available_Seats` int NOT NULL,
  `Created_Date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `Update_Date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Showtime_Id`),
  KEY `Movie_Id` (`Movie_Id`),
  KEY `Theatre_Id` (`Theatre_Id`),
  CONSTRAINT `bms_movies_showtime_ibfk_1` FOREIGN KEY (`Movie_Id`) REFERENCES `bms_movies` (`Movie_Id`),
  CONSTRAINT `bms_movies_showtime_ibfk_2` FOREIGN KEY (`Theatre_Id`) REFERENCES `bms_theatres` (`Theatre_Id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bms_movies_showtime`
--

LOCK TABLES `bms_movies_showtime` WRITE;
/*!40000 ALTER TABLE `bms_movies_showtime` DISABLE KEYS */;
INSERT INTO `bms_movies_showtime` VALUES (20,1,1,'13:00:00','2023-09-10',300.00,150,'2023-08-31 18:30:00','2023-08-31 18:30:00'),(21,1,2,'15:30:00','2023-09-11',400.00,120,'2023-09-01 18:30:00','2023-09-01 18:30:00'),(22,2,3,'18:15:00','2023-09-12',110.00,160,'2023-09-02 18:30:00','2023-09-02 18:30:00'),(23,3,1,'14:30:00','2023-09-13',500.00,180,'2023-09-03 18:30:00','2023-09-03 18:30:00'),(24,3,2,'17:00:00','2023-09-14',600.00,140,'2023-09-04 18:30:00','2023-09-04 18:30:00'),(25,4,3,'16:45:00','2023-09-15',200.00,160,'2023-09-05 18:30:00','2023-09-05 18:30:00'),(26,4,1,'19:30:00','2023-09-16',70.00,130,'2023-09-06 18:30:00','2023-09-06 18:30:00'),(27,5,2,'13:45:00','2023-09-17',190.00,170,'2023-09-07 18:30:00','2023-09-07 18:30:00'),(28,5,3,'16:15:00','2023-09-18',300.00,150,'2023-09-08 18:30:00','2023-09-08 18:30:00'),(29,6,1,'15:30:00','2023-09-19',500.00,160,'2023-09-09 18:30:00','2023-09-09 18:30:00'),(30,6,2,'18:00:00','2023-09-20',200.00,140,'2023-09-10 18:30:00','2023-09-10 18:30:00'),(31,7,3,'14:45:00','2023-09-21',950.00,180,'2023-09-11 18:30:00','2023-09-11 18:30:00'),(32,7,1,'17:15:00','2023-09-22',100.00,150,'2023-09-12 18:30:00','2023-09-12 18:30:00'),(33,8,2,'16:30:00','2023-09-23',150.00,170,'2023-09-13 18:30:00','2023-09-13 18:30:00'),(34,8,3,'19:00:00','2023-09-24',1200.00,130,'2023-09-14 18:30:00','2023-09-14 18:30:00'),(35,9,1,'14:00:00','2023-09-25',600.00,180,'2023-09-15 18:30:00','2023-09-15 18:30:00'),(36,9,2,'17:45:00','2023-09-26',150.00,160,'2023-09-16 18:30:00','2023-09-16 18:30:00'),(37,10,3,'15:15:00','2023-09-27',100.00,170,'2023-09-17 18:30:00','2023-09-17 18:30:00'),(38,10,1,'18:30:00','2023-09-28',125.00,140,'2023-09-18 18:30:00','2023-09-18 18:30:00');
/*!40000 ALTER TABLE `bms_movies_showtime` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bms_movies_type`
--

DROP TABLE IF EXISTS `bms_movies_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bms_movies_type` (
  `Type_Id` int NOT NULL AUTO_INCREMENT,
  `Type` varchar(255) NOT NULL,
  `Created_Date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `Update_Date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Type_Id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bms_movies_type`
--

LOCK TABLES `bms_movies_type` WRITE;
/*!40000 ALTER TABLE `bms_movies_type` DISABLE KEYS */;
INSERT INTO `bms_movies_type` VALUES (1,'2D','2023-08-31 18:30:00','2023-08-31 18:30:00'),(2,'3D','2023-08-31 18:30:00','2023-08-31 18:30:00'),(3,'4D','2023-08-31 18:30:00','2023-08-31 18:30:00');
/*!40000 ALTER TABLE `bms_movies_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bms_sound_type`
--

DROP TABLE IF EXISTS `bms_sound_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bms_sound_type` (
  `Sound_Type_Id` int NOT NULL AUTO_INCREMENT,
  `Sound_Type_Name` varchar(255) NOT NULL,
  `Created_Date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `Update_Date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Sound_Type_Id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bms_sound_type`
--

LOCK TABLES `bms_sound_type` WRITE;
/*!40000 ALTER TABLE `bms_sound_type` DISABLE KEYS */;
INSERT INTO `bms_sound_type` VALUES (1,'Dolby Digital','2023-08-31 18:30:00','2023-08-31 18:30:00'),(2,'Dolby Atmos','2023-08-31 18:30:00','2023-08-31 18:30:00'),(3,'DTS','2023-08-31 18:30:00','2023-08-31 18:30:00');
/*!40000 ALTER TABLE `bms_sound_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bms_theatres`
--

DROP TABLE IF EXISTS `bms_theatres`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bms_theatres` (
  `Theatre_Id` int NOT NULL AUTO_INCREMENT,
  `Theatre_Name` varchar(255) NOT NULL,
  `Location` varchar(255) NOT NULL,
  `Sound_Type_Id` int DEFAULT NULL,
  `Capacity` int DEFAULT NULL,
  `IsActive` tinyint(1) DEFAULT NULL,
  `Created_Date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `Update_Date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Theatre_Id`),
  KEY `Sound_Type_Id` (`Sound_Type_Id`),
  CONSTRAINT `bms_theatres_ibfk_1` FOREIGN KEY (`Sound_Type_Id`) REFERENCES `bms_sound_type` (`Sound_Type_Id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bms_theatres`
--

LOCK TABLES `bms_theatres` WRITE;
/*!40000 ALTER TABLE `bms_theatres` DISABLE KEYS */;
INSERT INTO `bms_theatres` VALUES (1,'PVR','Chennai',1,200,1,'2023-08-31 18:30:00','2023-08-31 18:30:00'),(2,'INOX','Bangalore',2,150,1,'2023-09-01 18:30:00','2023-09-01 18:30:00'),(3,'AGS','Mumbai',1,180,1,'2023-09-02 18:30:00','2023-09-02 18:30:00'),(4,'LUXE','Delhi',3,220,1,'2023-09-03 18:30:00','2023-09-03 18:30:00');
/*!40000 ALTER TABLE `bms_theatres` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-09-05  2:02:51
