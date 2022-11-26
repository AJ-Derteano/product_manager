CREATE DATABASE IF NOT EXISTS product_manager;

USE product_manager;

CREATE TABLE IF NOT EXISTS `product_manager`.`categories` (
  `idcategory` INT NOT NULL AUTO_INCREMENT,
  `category` VARCHAR(50) NOT NULL,
  `date_created` DATETIME NOT NULL,
  `user_created` VARCHAR(45) NOT NULL,
  `date_updated` DATETIME NOT NULL,
  `user_updated` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idcategory`)
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb4;

CREATE TABLE IF NOT EXISTS `product_manager`.`brands` (
  `idbrand` INT NOT NULL AUTO_INCREMENT,
  `brand` VARCHAR(50) NULL,
  `date_created` DATETIME NOT NULL,
  `user_created` VARCHAR(45) NOT NULL,
  `date_updated` DATETIME NOT NULL,
  `user_updated` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idbrand`)
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb4;

CREATE TABLE IF NOT EXISTS `product_manager`.`units` (
  `idunit` INT NOT NULL AUTO_INCREMENT,
  `unit_code` CHAR(6) NOT NULL,
  `description` VARCHAR(50) NOT NULL,
  `date_created` DATETIME NOT NULL,
  `user_created` VARCHAR(45) NOT NULL,
  `date_updated` DATETIME NOT NULL,
  `user_updated` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idunit`)
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb4;

CREATE TABLE IF NOT EXISTS `product_manager`.`unit_equivalence` (
  `idunit_equivalence` INT NOT NULL AUTO_INCREMENT,
  `base_unit` INT NOT NULL,
  `des_unit` INT NOT NULL,
  `multiple_quantity` SMALLINT NOT NULL,
  `description` VARCHAR(255) NULL,
  `start_validity` DATETIME NOT NULL,
  `end_validity` DATETIME NOT NULL,
  `status` CHAR(1) NOT NULL DEFAULT 'A',
  PRIMARY KEY (`idunit_equivalence`),
  CONSTRAINT `f_unit_equivalence1`
    FOREIGN KEY (`base_unit`)
    REFERENCES `product_manager`.`units` (`idunit`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `f_unit_equivalence2`
    FOREIGN KEY (`des_unit`)
    REFERENCES `product_manager`.`units` (`idunit`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb4;

CREATE TABLE IF NOT EXISTS `product_manager`.`products` (
  `idproduct` INT NOT NULL AUTO_INCREMENT,
  `product` VARCHAR(255) NOT NULL,
  `idunit` INT NOT NULL,
  `idcategory` INT NOT NULL,
  `idbrand` INT NOT NULL,
  `filename` MEDIUMTEXT NULL,
  `origen_web` MEDIUMTEXT NULL,
  `date_created` DATETIME NOT NULL,
  `user_created` VARCHAR(45) NOT NULL,
  `date_updated` DATETIME NOT NULL,
  `user_updated` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idproduct`),
  INDEX `f_products1_idx` (`idunit` ASC) VISIBLE,
  INDEX `f_products2_idx` (`idcategory` ASC) VISIBLE,
  INDEX `f_products4_idx` (`idbrand` ASC) VISIBLE,
  CONSTRAINT `f_products1`
    FOREIGN KEY (`idunit`)
    REFERENCES `product_manager`.`units` (`idunit`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `f_products2`
    FOREIGN KEY (`idcategory`)
    REFERENCES `product_manager`.`categories` (`idcategory`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `f_products4`
    FOREIGN KEY (`idbrand`)
    REFERENCES `product_manager`.`brands` (`idbrand`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb4;

CREATE TABLE IF NOT EXISTS `product_manager`.`warehouse` (
  `idwarehouse` INT NOT NULL AUTO_INCREMENT,
  `code` VARCHAR(50) NOT NULL,
  `description` VARCHAR(255) NULL,
  `date_low` DATETIME NULL,
  `date_created` DATETIME NOT NULL,
  `user_created` VARCHAR(45) NOT NULL,
  `date_updated` DATETIME NOT NULL,
  `user_updated` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idwarehouse`)
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb4;

CREATE TABLE IF NOT EXISTS `product_manager`.`items_warehouse` (
  `idwarehouse` INT NOT NULL,
  `idproduct` INT NOT NULL,
  `logistic_variable` SMALLINT NOT NULL,
  `stock` SMALLINT NOT NULL,
  `idunit` INT NOT NULL,
  `expiration_date` DATE NULL,
  `date_created` DATETIME NOT NULL,
  `user_created` VARCHAR(45) NOT NULL,
  `date_updated` DATETIME NOT NULL,
  `user_updated` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idwarehouse`),
  INDEX `i_items_warehouse1` (`idproduct` DESC) VISIBLE,
  CONSTRAINT `f_items_warehouse1`
    FOREIGN KEY (`idwarehouse`)
    REFERENCES `product_manager`.`warehouse` (`idwarehouse`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `f_items_warehouse2`
    FOREIGN KEY (`idproduct`)
    REFERENCES `product_manager`.`products` (`idproduct`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `f_items_warehouse3`
    FOREIGN KEY (`idunit`)
    REFERENCES `product_manager`.`units` (`idunit`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb4;