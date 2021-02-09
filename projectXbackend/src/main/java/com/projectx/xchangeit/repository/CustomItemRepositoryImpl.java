package com.projectx.xchangeit.repository;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.util.StringUtils;

import com.projectx.xchangeit.model.CustomItem;
import com.projectx.xchangeit.model.Image;
import com.projectx.xchangeit.model.Item;
import com.projectx.xchangeit.model.ItemAgeEnum;
import com.projectx.xchangeit.model.ItemSearchCriteria;

public class CustomItemRepositoryImpl implements CustomItemRepository {

	@PersistenceContext
	private EntityManager entityManager;

	@Override
	public List<Item> itemSearch(ItemSearchCriteria searchCriteria) {
		CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
		CriteriaQuery<Item> criteriaQuery = criteriaBuilder.createQuery(Item.class);
		Root<Item> itemRoot = criteriaQuery.from(Item.class);

		List<Predicate> predicates = new ArrayList<>();

		Predicate deletedPredicate = criteriaBuilder.equal(itemRoot.<Boolean>get("deleted"), false);
		predicates.add(deletedPredicate);

		if (!StringUtils.isEmpty(searchCriteria.getTextSearch())) {
			Predicate descriptionPredicate = criteriaBuilder.like(criteriaBuilder.lower(itemRoot.get("description")),
					"%" + searchCriteria.getTextSearch().toLowerCase() + "%");
			Predicate titlePredicate = criteriaBuilder.like(criteriaBuilder.lower(itemRoot.get("title")),
					"%" + searchCriteria.getTextSearch().toLowerCase() + "%");
			predicates.add(criteriaBuilder.or(titlePredicate, descriptionPredicate));
		}

		if (searchCriteria.getMinPrice() != null || searchCriteria.getMaxPrice() != null) {

			Double minPrice = searchCriteria.getMinPrice() != null ? searchCriteria.getMinPrice() : 0.0;
			Double maxPrice = searchCriteria.getMaxPrice() != null ? searchCriteria.getMaxPrice() : Double.MAX_VALUE;

			Predicate pricePredicate = criteriaBuilder.between(itemRoot.get("price"), minPrice, maxPrice);
			predicates.add(pricePredicate);
		}

		if (!StringUtils.isEmpty(searchCriteria.getAge())) {
			Predicate agePredicate = criteriaBuilder.equal(itemRoot.get("age"),
					ItemAgeEnum.valueOf(searchCriteria.getAge()).toString());
			predicates.add(agePredicate);
		}

		if (!StringUtils.isEmpty(searchCriteria.getColor())) {
			Predicate colorPredicate = criteriaBuilder.equal(itemRoot.get("color"), searchCriteria.getColor());
			predicates.add(colorPredicate);
		}

		criteriaQuery.where(predicates.toArray(new Predicate[0]));
		List<Item> items = entityManager.createQuery(criteriaQuery).getResultList();

		return items;
	}

	@Override
	public List<Image> listPrimaryImages() {
		CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
		CriteriaQuery<Image> imageCriteriaQuery = criteriaBuilder.createQuery(Image.class);
		Root<Image> imageRoot = imageCriteriaQuery.from(Image.class);

		List<Predicate> predicates = new ArrayList<>();

		// TODO non deleted parent item predicate
		Predicate primaryPredicate = criteriaBuilder.equal(imageRoot.<Boolean>get("primaryImage"), true);
		predicates.add(primaryPredicate);

		imageCriteriaQuery.where(predicates.toArray(new Predicate[0]));

		List<Image> images = entityManager.createQuery(imageCriteriaQuery).getResultList();

		return images;
	}

	@Override
	public List<CustomItem> listUserItems(Integer userId) {
		String query = "SELECT NEW com.projectx.xchangeit.model.CustomItem(i.id, i.title, i.description, i.status, i.publishDate, i.lastModifiedDate, i.thumbnail) FROM Item i WHERE i.deleted= false and i.producer.id= "
				+ userId;
		TypedQuery<CustomItem> typedQuery = entityManager.createQuery(query, CustomItem.class);
		return typedQuery.getResultList();
	}

	@Override
	public List<CustomItem> listAllNonDeletedItems() {
		String query = "SELECT NEW com.projectx.xchangeit.model.CustomItem(i.id, i.title, i.description, i.status, i.thumbnail, i.price, i.category, i.producer, i.totalRating, i.location) FROM Item i WHERE i.deleted= false ORDER BY i.publishDate";
		TypedQuery<CustomItem> typedQuery = entityManager.createQuery(query, CustomItem.class);
		return typedQuery.getResultList();
	}

}
